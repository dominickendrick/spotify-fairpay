import axios from "axios";
import qs from 'qs';

export const clientId = "ad2aef8b86924e66941a6c4344c4bf8a";
export const spotifyAuthDomain = "https://accounts.spotify.com";
const redirectUrl = "http://localhost:3000/auth-callback";
const scopes = "user-read-recently-played user-top-read";

export const getCrypto = () => {
    //ie 11.x uses msCrypto
    return (window.crypto || (window as any).msCrypto) as Crypto;
  };

export const getCryptoSubtle = () => {
    const crypto = getCrypto();
    //safari 10.x uses webkitSubtle
    return crypto.subtle || (crypto as any).webkitSubtle;
  };

export const sha256 = async (s: string) => {
    const digestOp: any = getCryptoSubtle().digest(
      { name: 'SHA-256' },
      new TextEncoder().encode(s)
    );
  
    // msCrypto (IE11) uses the old spec, which is not Promise based
    // https://msdn.microsoft.com/en-us/expression/dn904640(v=vs.71)
    // Instead of returning a promise, it returns a CryptoOperation
    // with a result property in it.
    // As a result, the various events need to be handled in the event that we're
    // working in IE11 (hence the msCrypto check). These events just call resolve
    // or reject depending on their intention.
    if ((window as any).msCrypto) {
      return new Promise((res, rej) => {
        digestOp.oncomplete = (e: any) => {
          res(e.target.result);
        };
  
        digestOp.onerror = (e: ErrorEvent) => {
          rej(e.error);
        };
  
        digestOp.onabort = () => {
          rej('The digest operation was aborted');
        };
      });
    }
  
    return await digestOp;
  };
  
  const urlEncodeB64 = (input: string) => {
    const b64Chars: { [index: string]: string } = { '+': '-', '/': '_', '=': '' };
    return input.replace(/[+/=]/g, (m: string) => b64Chars[m]);
  };
  
  // https://stackoverflow.com/questions/30106476/
  const decodeB64 = (input: string) =>
    decodeURIComponent(
      atob(input)
        .split('')
        .map(c => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  
  export const urlDecodeB64 = (input: string) =>
    decodeB64(input.replace(/_/g, '/').replace(/-/g, '+'));
  
  export const bufferToBase64UrlEncoded = (input: number[] | Uint8Array) => {
    const ie11SafeInput = new Uint8Array(input);
    return urlEncodeB64(
      window.btoa(String.fromCharCode(...Array.from(ie11SafeInput)))
    );
  };

export const loginRedirect = () => {
// helper function to generate a random string
const makeid = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // helper function to generate a random number
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  const initiateSpotifyLogin = async () => {
    // Generate the code verifier and its base 64 encoded hash
    const codeVerifier = makeid(getRandomInt(43, 128));
    const hashed = await sha256(codeVerifier)
    const codeChallenge = bufferToBase64UrlEncoded(hashed)
    const state = makeid(12);

    console.log("initial code verifier is", codeVerifier)

    // Set the code verifier and state in local storage so we can check it later
    sessionStorage.setItem("spotify-code-verifier", codeVerifier);
    sessionStorage.setItem("spotify-state", state);

    // construct the authentication url
    const authURL = new URL(spotifyAuthDomain + '/authorize')
    

    authURL.searchParams.append("response_type", "code");
    authURL.searchParams.append("client_id", clientId)
    authURL.searchParams.append("redirect_uri", redirectUrl)
    authURL.searchParams.append("scope", scopes)
    authURL.searchParams.append("state", state)
    authURL.searchParams.append("code_challenge", codeChallenge)
    authURL.searchParams.append("code_challenge_method", "S256")
    
    console.log("auth URl is ",authURL)

    // open the spotify authentication page
    window.location.href = authURL.toString();
  };

    initiateSpotifyLogin()

};

export const tokenExchange = async () => {
    const params = new URL(window.location.href).searchParams;
    const code = params.get("code");
    const state = params.get("state");
    const code_verifier = sessionStorage.getItem("spotify-code-verifier")
  
    console.log(state, code, params);
  
    console.log("code verifier in token exchange is", code_verifier)
  
    const postBody = {
      client_id: clientId,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/auth-callback",
      code_verifier: code_verifier
    };
  
    const tokenUrl = spotifyAuthDomain + "/api/token";
  
    axios.post(tokenUrl, qs.stringify(postBody), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then((res) => {
      console.log("spotify access token", res.data);
      sessionStorage.setItem("spotify-session-data", JSON.stringify(res.data))
      
    });
  };
  
export const getTopArtists = async (setTopArtists: any) => {
    const sessionData = getSessionData()

    if(sessionData) {
        const accessToken = sessionData.access_token
        const config = {
            headers: { Authorization: `Bearer ${accessToken}` }
        };
        
        
        axios.get( 
          'https://api.spotify.com/v1/me/top/artists',
          config
        ).then((res) => {
            console.log("top artists are", res.data.items)
            setTopArtists(res.data)
        }).catch(console.log);
    }

    return {
        items: []
    }
}

export const getSessionData = () => {
    const sessionData = sessionStorage.getItem("spotify-session-data")

    if (sessionData) {
        try {
            console.log("session data is", sessionData)
            return JSON.parse(sessionData)
        } catch(e) {
            console.log("failed to parse storage data", e)
        }
    }
}