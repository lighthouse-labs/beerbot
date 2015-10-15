SlackClient = require('slack-client');

console.log("Starting beerbot server");

slack = new SlackClient(process.env.SLACK_TOKEN, true, true)

slack.on('open', function() {
  console.log("Connected to Slack WS Server");

  // leave general so... no spam
  leaveAllChannels();
  sayHelloToDon();

  // private functions below
  // var leaveAllChannels = function(){
  function leaveAllChannels() {
    for (var id in slack.channels) {
      var channel = slack.channels[id];
      if (channel.is_member) {
        console.log("Leaving channel " + channel.name);
        channel.leave(); // This doesn't work! That's why we are checking the !channel.is_general in the 'message' callback.
      }
    }
  }

  function sayHelloToDon() {
    // we won't spam don now. just an example
  }
});

slack.on('error', function(error) {
  console.error('Error in Slack: ', error);
});

slack.on('message', function(message) {
  // console.log("Message came in: ", message);

  var channel = slack.getChannelGroupOrDMByID(message.channel);

  if(message.type === 'message' && !channel.is_general) {
    channel.send(message.text + "!!!");
});

slack.login(); // start connection to Slack websockets server
