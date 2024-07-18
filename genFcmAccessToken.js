const { JWT } = require("google-auth-library");

const PROJECT_ID = "voter-dc907";
const HOST = "fcm.googleapis.com";
const PATH = "/v1/projects/" + PROJECT_ID + "/messages:send";
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require("./firebase-config.json");
    const jwtClient = new JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

const getToken = async () => {
  const token = await getAccessToken();
  console.log("🚀 ~ getToken ~ token:", token);
};

getToken()
  .then(() => {})
  .catch((err) => console.log(err));
