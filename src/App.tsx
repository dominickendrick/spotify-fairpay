import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { loginRedirect, tokenExchange } from "./spotify/api";
import {
  ArtistsData
} from "./spotify/ArtistsData";

import "./App.css";

function App() {
  return (
    <Router basename={__DEV__ ? "/" : "/spotify-fairpay"}>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth-callback">
            <Auth />
          </Route>
          <Route path="/top-artists">
            <ArtistsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <section className="App">
      <div className="homepage">
      <header className="App-header"></header>
      <h1>
        Are you your favourite artists being paid enough for their music on
        spotify?
      </h1>
      <p>
        More people are listening to music via Spotify, but many musicians are
        not being paid enough for their work.
      </p>
      <p>
        Check to see if your favourite artists are getting their fair share of
        money.
      </p>
      <button className="login-button" onClick={loginRedirect}>
        Login to Spotify
      </button>
      </div>
    </section>

  );
}

function Auth() {
  useEffect(() => {
    async function getToken() {
      return tokenExchange();
    }
    //once we've got the access token for spotify, we redirect the user to the top artists page
    getToken().then((res) => {
      sessionStorage.setItem("spotify-session-data", JSON.stringify(res.data));
      window.location.href = "/top-artists";
    });
  }, []);
  return <p>Successfully Logged in</p>;
}

function ArtistsPage() {
 return(<ArtistsData></ArtistsData>)
}

export default App;
