
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import { loginRedirect, tokenExchange, getSessionData, getTopArtists } from "./spotify/api"

import './App.css';

function App() {
  return (
    <Router>
      <div>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/auth-callback">
            <Auth />
          </Route>
        </Switch>
      </div>
    </Router>
   
  );
}

function Home() {
  return (

        <div className="App">
        <header className="App-header">
      </header>
      <h1>Hello Betsy</h1>
      <p>Please login to spotify to start analysing your listening data</p>
      <button className="login" onClick={loginRedirect}>Login to spotify</button>
    </div>
  );
}

function ArtistList(props?: ArtistProps) {
  console.log("artists are! !!", props)
  if(props && props.artists){
    const listItems = props.artists.items.map((artist) =>
  <tr key={artist.id}><td>{artist.name}</td><td>{artist.popularity}</td></tr>
    );
    return (
      <table>
        <thead>
          <tr><th>Name</th><th>Popularity</th></tr>
        </thead>
        <tbody>{listItems}</tbody>
        </table>
    );
  } else {
    return(<ul></ul>)
  }
  
}

interface ArtistProps {
  artists: Artists | undefined
}

interface Artists {
    items: [
      { external_urls: {spotify: string},
        followers: {
          href: string, 
          total: number
        },
        genres: Array<string>,
        href: string,
        id: string,
        images: [{height: number
          url: string
          width: number}]
        name: string,
        popularity: number,
        type: string,
        uri: string,
      }
    ]
  }


function Auth() {

  const [topArtists, setTopArtists] = useState<Artists>();

  useEffect(() => {
    async function getToken() {
      return tokenExchange()
    }

    //const accessToken = getSessionData()
    //if(!accessToken || accessToken){
      getToken()
    //} 
  }, []);

  useEffect(() => {
      getTopArtists(setTopArtists)
  },[])
  return (
    <div className="App">
      <p>Top Artists</p>
      <ArtistList artists={topArtists}></ArtistList>
    </div>
  );
}

export default App;
