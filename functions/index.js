const functions = require("firebase-functions");
const express = require('express');
const requestPromise = require('request-promise-native');
const cors = require('cors');

//local
//http://localhost:5000/functions-ba321/us-central1/api

//deploy
//https://us-central1-functions-ba321.cloudfunctions.net/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const app = express();

app.use(cors());

//hotpepper
const getDataFromApi = async (keyword) => {
  // cloud functionsから実行する場合には地域の設定が必要になるため，`country=JP`を追加している
  const requestUrl =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=[]f&keyword=";
  const result = await requestPromise(`${requestUrl}${keyword}`);
  return result;
};

//hotpepper routing
app.get('/hotpepper/:keyword', async (req, res) => {
  const response = await getDataFromApi(req.params.keyword);
  res.send(response);
});

const api = functions.https.onRequest(app);
module.exports = { api };

// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
