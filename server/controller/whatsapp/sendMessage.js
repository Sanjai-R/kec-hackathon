import axios from "axios";

const APP_ID = "";
const APP_SECRET = "1357534331676313";
const RECIPIENT_WAID = "";
const VERSION = "v13.0";
const PHONE_NUMBER_ID = "106023782412410";
const ACCESS_TOKEN =
  "EAATSq5ecJpkBAL3rmX3JDYj21THdsPCbCjesR4jdX5PQ4k4rUbfnGHnHowGLaPvqAZCbAwK9cnN89TGPIu4qWh3CZAOSiaZAdXTYVYKeshys2Jx9PZAQuCKwZAUjg4q2oRoe8M62q6eQZCeM97ZAtLJWCTKZAHgbT9opjOnDQWqCu9psgYQRrndoJvLlpm2kH2yNqyLMBqSkNQy5kMH4pxbzvWS7249ZBMfEZD";

function sendMessage(data) {
  var config = {
    method: "post",
    url: `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/messages`,
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config);
}
