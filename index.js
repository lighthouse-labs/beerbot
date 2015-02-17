var Slack = require('slack-client');
var beerapi = require('./beerapi.js');

var token = process.env.SLACK_TOKEN;
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

slack.on('connect', function(){
  // leave all channels you are connected to
  var key;
  for (key in slack.channels) {
    if (slack.channels[key].is_member) {
      slack.channels[key].leave();
    }
  }
});

slack.on('message', function(message){
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var user = slack.getUserByID(message.user);
  var beerName = message.text;

  // respond to the sender with the same message
  beerapi.getDescription(beerName, function(description) {
    channel.send(description);
  });

  console.log("!!!! Responded to %s.", user.name);
});

slack.on('error', function(error) {
  console.log("Error", error);
});

slack.login();
