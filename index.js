Slack = require('slack-client');
getBeer = require('./beerapi');

var token = process.env.SLACK_BOT_KEY;
var autoReconnect = true;
var autoMark = true;

slack = new Slack(token, autoReconnect, autoMark);

slack.on('open', function() {
  console.log("OPEN");
  console.log("You are " + slack.self.name + " of " + slack.team.name);
});

slack.on('message', function(message) {
  var userId = message.user;
  var user = slack.getUserByID(userId);
  var channel = slack.getChannelGroupOrDMByID(message.channel);
  var response;
  console.log(user.name, ": ",  message.text);

  if(message.type === "message" && typeof(channel) !== "undefined") {
    getBeer(message.text, function(error, data){
      if(error) {
        channel.send("Could not get your beer info");
        return;
      }
      channel.send(data.name + " (" + data.abv + " %)");
      channel.send(data.description);
    });
  }
});

slack.on('error', function(error) {
  console.log('ERROR ', error);
});

slack.login();
