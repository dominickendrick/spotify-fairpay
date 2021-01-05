import axios from "axios";
import qs from "qs";
import {
  clientId,
  getSessionData,
  loginRedirect,
  setAccessTokenExpiery,
  spotifyAuthDomain,
} from "./api";

export interface AuthHeader {
  headers: {
    Authorization: string;
  };
}

const refreshAccessToken = async (refresh_token: string) => {
  const postBody = {
    client_id: clientId,
    grant_type: "authorization_code",
    code: refresh_token,
  };

  const tokenUrl = spotifyAuthDomain + "/api/token";

  //  exchange the authorisation code for the access and refresh tokens
  return await axios.post(tokenUrl, qs.stringify(postBody), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

const sessionData = getSessionData();

const tokenStillActive = (): boolean => {
  if(sessionData && sessionData.expires_at && sessionData.expires_at >= Date.now()) {
    return true;
  } else {
    return false;
  }
};

const accessTokenConfig = async (): Promise<AuthHeader> => {
  if (sessionData && tokenStillActive()) {
    const accessToken = sessionData.access_token;

    return Promise.resolve({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  if (sessionData && !tokenStillActive() && sessionData.refresh_token) {
    console.log("session not active but have refresh token", tokenStillActive() )
    const newSessionData = await refreshAccessToken(sessionData.refresh_token);
    const sessionDataWithExpirey = setAccessTokenExpiery(newSessionData.data);
    //store the acccess tokens in session storage
    sessionStorage.setItem(
      "spotify-session-data",
      JSON.stringify(sessionDataWithExpirey)
    );
    return Promise.resolve({
      headers: {
        Authorization: `Bearer ${sessionDataWithExpirey.access_token}`,
      },
    });
  }

  return Promise.reject(
    "Failed to refresh access token, user needs to login again"
  );
};

export const getAuthHeader = async (): Promise<AuthHeader | void> => {
  return accessTokenConfig()
    .then((accessTokenHeader) => {
      return accessTokenHeader;
    })
    .catch((error) => {
      //if we are not able to refresh the current token,
      //  or they are not logged in at all, redirect to spotify auth page
      loginRedirect();
    });
};
