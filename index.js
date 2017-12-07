const express = require('express');
const app = express();
const port = 3000;
const Slack = require('slack-node');
const webhookUri = "https://hooks.slack.com/services/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";
slack = new Slack();
slack.setWebhook(webhookUri);

const sendMessage = (title, message) => {
  slack.webhook({
    channel: "#grow-bot",
    username: "webhookbot",
    attachments: [
        {
            "title": title,
            "pretext": "Pretext _supports_ mrkdwn",
            "text": message,
            "mrkdwn_in": ["text", "pretext"]
        }
    ]
  }, function(err, response) {
    console.log(response);
  });

}

app.get('/ph', (request) => {
  sendMessage('PH', request.query.ph)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

