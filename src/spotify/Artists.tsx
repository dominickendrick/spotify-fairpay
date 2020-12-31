import React from "react";
import axios from "axios";
import { getSessionData } from "./api"

export interface ArtistProps {
  artists: Artists | undefined;
}

export interface Artists {
  items: [
    {
      external_urls: { spotify: string };
      followers: {
        href: string;
        total: number;
      };
      genres: Array<string>;
      href: string;
      id: string;
      images: Array<ArtistImage>;
      name: string;
      popularity: number;
      type: string;
      uri: string;
    }
  ];
}

interface ArtistImage{ height: number; url: string; width: number }

export function ArtistList(props?: ArtistProps) {
  if (props && props.artists) {
    const listItems = props.artists.items.map((artist) => (
      <tr key={artist.id} >
        <td><img className="circle-image" src={artist.images[2].url} alt={artist.name} ></img></td>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Popularity</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    );
  } else {
    return <ul></ul>;
  }
}

export const getTopArtists = async (setTopArtists: any) => {
  const sessionData = getSessionData();

  if (sessionData) {
    console.log("session data", sessionData)
    const accessToken = sessionData.access_token;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    const topArtists = await axios
      .get("https://api.spotify.com/v1/me/top/artists", config)
      .then((res) => {
        return res.data
      })
      .catch(console.log);
      
    setTopArtists(topArtists);
    
  }
};
