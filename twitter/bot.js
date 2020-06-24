const Twit = require("twit");
const dotenv = require("dotenv");
const admin = require("firebase-admin");

dotenv.config();

var T = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_EMAIL,
    project_id: "leafs-prospects"
  }),
  databaseURL: "https://leafs-prospects.firebaseio.com"
});

async function sendTweet() {
  const prospects = [];
  await admin.database().ref("yesterdaysGames").once('value').then(t => {
    const ids = Object.keys(t.val())
    ids.forEach((id) => {
      prospects.push(t.val()[id])
    })
  });

  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const messageBegginning = `Prospect statlines from ${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()} (S-G-A-P): \n`;
  const messages = [messageBegginning];
  let messageIndex = 0

  prospects.forEach(({ fullName, shots, goals, assists, points }) => {
    const statline = `${fullName} ${shots}-${goals}-${assists}-${points} \n`;
    if (messages[messageIndex].length + statline.length < 270) {
      messages[messageIndex] = messages[messageIndex].concat(statline);
    } else {
      messageIndex++
      messages.push(messageBegginning)
    }
  });

  messages.forEach((message) => {
    T.post('statuses/update', { status: message }, function(_err, data, _response) {
      console.log(data)
    })
  })

  admin.app().delete();
}

sendTweet()
