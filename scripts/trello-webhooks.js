module.exports = function (robot) {

    robot.router.head('/hubot/trello-webhooks', function (req, res) {
        robot.logger.info(`Trello webhook creation. Callback: /hubot/trello-webhooks. Status Code: ${res.statusCode}`);
        res.send(200);

        // save trello id and user
    });

    robot.router.post('/hubot/trello-webhooks', function (req, res) {
        var headers = req.headers
        res.send(200);

        console.log('received')
        // TODO: validate the webhook source

        var payload = req.body;
        var type = payload.action.type;
        var actionId = payload.action.id
        var room = req.query.room
        var modelId = payload.model.id


        /* Notes: 
         * Every webhook is a unique compination of callback_url, model_id and user_token.
         * The callback_url contains the webhook's room for chat client (i.e. slack channel) to post the updates
         * where callback body is the same for all webhooks (callback body is actually the bot host url). 
         * So getting the room name && model_id we can regocnize the user who created the webhook 
         * and use his token for the GET trello action request.  
         */

        // console.log(payload)

         if (type == 'updateBoard' && payload.action.data.board.name) {
            // change the name in db
            var newName = payload.action.data.board.name 
            robot.emit('trelloBoardRename', modelId, newName)
            /* TODO-Note:
             * The "bad-part" of this is that when a team has multiple webhooks,
             * it's gonna call the db as many times as the number of the webhooks 
             */
        }

        var handled = robot.emit('postTrelloAction', modelId, room, actionId)
        if (!handled) {
            robot.logger.warning('No scripts handled the Trello Webhook Action.');
        }
    });
}
