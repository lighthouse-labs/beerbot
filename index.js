var Slack = require('slack-client');

var token = process.env.SLACK_TOKEN;
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

slack.on('message', function(message){
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);
  var text = message.text;

  // respond to the sender with the same message
  channel.send(text);
  console.log("!!!! Responded to %s.", user.name);
});

slack.login();
