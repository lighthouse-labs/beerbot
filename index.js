SlackClient = require('slack-client');

console.log("Starting beerbot server");

slack = new SlackClient(process.env.SLACK_TOKEN, true, true)

slack.on('open', function() {
  console.log("Connected to Slack WS Server");
});

slack.on('error', function(error) {
  console.error('Error: ' + error);
});

slack.login(); // start connection to Slack websockets server
