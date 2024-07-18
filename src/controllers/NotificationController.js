const admin = require("firebase-admin");
const config = require("../../firebase-config.json");

admin.initializeApp({
  credential: admin.credential.cert(config),
});

const sendNotification = async (fcmToken, title, body) => {
  try {
    const message = {
      notification: {
        title,
        body,
      },
      token: fcmToken,
    };

    admin
      .messaging()
      .send(message)
      .then(function (response) {
        console.log("Message sent" + response);
      })
      .catch(function (error) {
        console.log("Failed to send message" + error);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendNotification };
