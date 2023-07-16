import store from "../store";

const twitterOAuth2URL = "https://twitter.com/i/oauth2/authorize?";
export const params = {
  response_type: "code",
  client_id: "RWN0S2Jwa0R0V0dVdkZEQ28tWFo6MTpjaQ",
  redirect_uri: "https://app.linkkey.io/Setting",
  state: "state",
  code_challenge: "challenge",
  code_challenge_method: "PLAIN",
  scope: "offline.access%20tweet.read%20users.read",
};

function constructAuthorizeURL() {
  return (
    twitterOAuth2URL +
    `response_type=${params.response_type}&client_id=${params.client_id}&redirect_uri=${params.redirect_uri}&state=${params.state}&code_challenge=${params.code_challenge}&code_challenge_method=${params.code_challenge_method}&scope=${params.scope}`
  );
}

export const getTwitterDataWithOAuth2 = () => {
  window.location.href = constructAuthorizeURL();
};
