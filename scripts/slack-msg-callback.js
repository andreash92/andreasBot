var slackToken = process.env.HUBOT_SLACK_VERIFY_TOKEN;

module.exports = function(robot)  {
  robot.router.post('/hubot/slack-msg-callback', function(req, res) {
    var data = null;
    res.send("come on");

  //   if(req.body.payload) {
  //     try {
  //       data = JSON.parse(req.body.payload);
  //     } catch(e) {
  //       robot.logger.error("Invalid JSON submitted to Slack message callback");
  //       //res.send(422)
  //       res.send('You supplied invalid JSON to this endpoint.');
  //       return;
  //     }
  //   } else {
  //     robot.logger.error("Non-JSON submitted to Slack message callback");
  //     //res.send(422)
  //     res.send('You supplied invalid JSON to this endpoint.');
  //     return;
  //   }

  //   if(data.token === slackToken) {
  //     robot.logger.info("Request is good");
  //   } else {
  //     robot.logger.error("Token mismatch on Slack message callback");
  //     //res.send(403)
  //     res.send('You are not authorized to use this endpoint.');
  //     return;
  //   }

  //   var handled = robot.emit(`slack:msg_action:${data.callback_id}`, data, res);
  //   if (!handled) {
  //     //res.send(500)
  //     res.send('No scripts handled the action.');
  //   }
  });
}
