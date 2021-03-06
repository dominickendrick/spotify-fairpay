import axios from "axios";
import qs from "qs";
import {
  sha256,
  bufferToBase64UrlEncoded,
  getRandomInt,
  makeid,
} from "./utils";

export interface SessionData {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  expires_at?: number;
}

export const basename = (withTrailingSlash: boolean = false) => {
  const trailingSlash = withTrailingSlash ? "/" : "";
  switch (window.location.host) {
    case "dominickendrick.github.io":
      return "/spotify-fairpay" + trailingSlash;
    default:
      return "/";
  }
};

export const clientId = "ad2aef8b86924e66941a6c4344c4bf8a";
export const spotifyAuthDomain = "https://accounts.spotify.com";
const redirectUrl = `${window.location.protocol}//${
  window.location.host
}${basename(true)}auth-callback`;
const scopes = "user-read-recently-played user-top-read";

export const loginRedirect = async () => {
  // Generate the code verifier and its base 64 encoded hash
  const codeVerifier = makeid(getRandomInt(43, 128));
  const hashed = await sha256(codeVerifier);
  const codeChallenge = bufferToBase64UrlEncoded(hashed);
  const state = makeid(12);

  // Set the code verifier and state in local storage so we can check it later
  sessionStorage.setItem("spotify-code-verifier", codeVerifier);
  sessionStorage.setItem("spotify-state", state);

  // construct the authentication url
  const authURL = new URL(spotifyAuthDomain + "/authorize");

  authURL.searchParams.append("response_type", "code");
  authURL.searchParams.append("client_id", clientId);
  authURL.searchParams.append("redirect_uri", redirectUrl);
  authURL.searchParams.append("scope", scopes);
  authURL.searchParams.append("state", state);
  authURL.searchParams.append("code_challenge", codeChallenge);
  authURL.searchParams.append("code_challenge_method", "S256");

  // open the spotify authentication page
  window.location.href = authURL.toString();
};

export const tokenExchange = async () => {
  const params = new URL(window.location.href).searchParams;
  const code = params.get("code");
  const state = params.get("state");
  // TODO: check state
  const code_verifier = sessionStorage.getItem("spotify-code-verifier");
  const request_state = sessionStorage.getItem("spotify-state");

  const postBody = {
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUrl,
    code_verifier: code_verifier,
  };

  const tokenUrl = spotifyAuthDomain + "/api/token";

  if (state === request_state) {

    //  exchange the authorisation code for the access and refresh tokens
    const sessionData = await axios.post(tokenUrl, qs.stringify(postBody), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });


    const sessionDataWithExpirey = setAccessTokenExpiery(sessionData.data)
    //store the acccess tokens in session storage
    sessionStorage.setItem(
      "spotify-session-data",
      JSON.stringify(sessionDataWithExpirey)
    );
  } else {
    return Promise.reject("State did not match");
  }
};

export const setAccessTokenExpiery = (sessionData: SessionData): SessionData => {
    sessionData.expires_at = Date.now() + (sessionData.expires_in * 1000);
    return sessionData
}

export const getSessionData = (): SessionData | undefined => {
  const sessionData = sessionStorage.getItem("spotify-session-data");
  if (sessionData) {
    try {
      return JSON.parse(sessionData);
    } catch (e) {
      console.log("failed to parse storage data", e);
    }
  }
};
