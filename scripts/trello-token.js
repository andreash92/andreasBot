var slackMsgs = require('./slackMsgs.js');
var url = require('url');
var Trello = require('node-trello');
var rp = require('request-promise');
var app_key = process.env.HUBOT_TRELLO_KEY;
var oauth_secret = process.env.HUBOT_TRELLO_OAUTH;
var db = require("./mlab-login").db();

module.exports = function(robot) {

    var oauth_secrets = {};
    var loginCallback = `https://andreasbot.herokuapp.com/hubot/trello-token`;
    var tOAuth = new Trello.OAuth(app_key, oauth_secret, loginCallback, 'Hubot');

    robot.respond(/trello auth/, function(res) {
        tOAuth.getRequestToken(function(err, data) {
            robot.logger.warning(data)
            oauth_secrets[data.oauth_token] = data.oauth_token_secret;
            res.send(data.redirect);
        })
    })

    robot.router.get('/hubot/trello-token', function(req, res) {
        let args = req.query;
        let query = url.parse(req.url, true).query;
        let token = query.oauth_token;
        args['oauth_token_secret'] = oauth_secrets[token];
        robot.logger.info(args);
        tOAuth.getAccessToken(args, function(err, data) {
            if (err) throw err;
            let token = data['oauth_access_token'];
            let t = new Trello(app_key, token);
            db.collection('trello').insert(t, function(err, result) {
                if (err) throw err;
                if (result) console.log('Added!');
            })
        })
        res.send(`<h2>Token succesfuly received. You can now close the window.</h2>\n
    				<button onclick=window.close()>close</button>`)
    });


    robot.hear('trello object', function(req, res) {
        var t = {};

        db.collection('trello').insert(t, function(err, result) {
            if (err) throw err;
            t = result;
        })

        let boardId = 'BE7seI7e';
        let args = { fields: "name,url,prefs" };

        t.get("/1/board/" + boardId, args, function(err, data) {
            if (err) {
                res.send('Error: ' + err);
                robot.logger.error(err);
                return 0;
            }
            robot.logger.info(data);
        })
    })













    robot.respond(/trello get token/i, function(res_r) {

        let scope = 'read,write,account';
        let name = 'Hubot';
        let expr = '30days';
        let cb_method = 'fragment';
        let return_url = 'https://andreasbot.herokuapp.com/hubot/trello-token';
        let url = `https://trello.com/1/authorize?expiration=${expr}&name=${name}&scope=${scope}&key=${key}&response_type=token&callback_method=${cb_method}&return_url=${return_url}`;
        var msg = slackMsgs.basicMessage();

        msg.attachments[0].pretext = "Please get a token to authorize your Trello account";
        msg.attachments[0].title = "Trello Token";
        msg.attachments[0].title_link = url;
        msg.attachments[0].text = "Copy the token from the link above and run\n *trello add token <YOUR TOKEN>*";
        msg.attachments[0].footer = "Trello";
        msg.attachments[0].footer_icon = "https://d2k1ftgv7pobq7.cloudfront.net/meta/u/res/images/b428584f224c42e98d158dad366351b0/trello-mark-blue.png";
        res_r.send(msg);
    })

    robot.respond(/trello add token (.*)/i, function(res_r) {
        var token = res_r.match[1];
        //***IMPORTANT*** 
        // the .env assignment doesnt work with HEROKU!
        // must set up a heroku client and communicate through their api 
        process.env['HUBOT_TRELLO_TOKEN'] = token;
    })
}