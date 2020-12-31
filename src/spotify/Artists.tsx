import React from "react";
import axios from "axios";
import { getSessionData } from "./api";

export interface ArtistProps {
  artists: Artists | undefined;
}

export interface Artists {
  items: Array<Artist>;
}

export interface Artist {
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
  listening_duration?: number;
}

interface ArtistImage {
  height: number;
  url: string;
  width: number;
}

interface RecentlyPlayedList {
  items: Array<RecentlyPlayed>
}

interface RecentlyPlayed {
  context: {
    external_urls: {
      spotify: string;
    };
    href: string;
    type: string;
    uri: string;
  };
  played_at: string;
  track: {
    album: {
      album_type: string;
      artists: [
        {
          external_urls: { spotify: string };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }
      ];
      available_markets: Array<string>;
      external_urls: { spotify: string };
      href: string;
      id: string;
      images: Array<string>;
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: [
      {
        external_urls: { spotify: string };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }
    ];
    available_markets: Array<string>;
    disc_number: number;
    duration_ms: number;
    explicit: false;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: string;
    uri: string;
  };
}

export function ArtistList(props?: ArtistProps) {
  if (props && props.artists) {
    const listItems = props.artists.items.map((artist, count) => (
      <tr key={artist.id}>
        <td>{count + 1}</td>
        <td>
          <img
            className="circle-image"
            src={artist.images[2].url}
            alt={artist.name}
          ></img>
        </td>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.listening_duration != 0 ? `${artist.listening_duration} mins` : "" } </td>
      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Artist</th>
            <th>Global Popularity</th>
            <th>Your listening time</th>
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
    console.log("session data", sessionData);
    const accessToken = sessionData.access_token;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    // get your top artists from the api
    const topArtists: Artists = await axios
      .get("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50", config)
      .then((res) => {
        return res.data;
      })
      .catch(console.log);

    
    // get your most recently played songs
    const recentlyPlayed: RecentlyPlayedList = await axios
      .get("https://api.spotify.com/v1/me/player/recently-played?limit=50", config)
      .then((res) => {
        console.log("recently played", res.data.items);
        return res.data;
      })
      .catch(console.log);

    //get listening duration from top artists if possible
    const artistsWithListeningDuration = topArtists.items.map((artist:Artist) => {
      //this should be a deep copy
      artist.listening_duration = getListeningDuration(artist, recentlyPlayed)
      return artist
    });

    setTopArtists({items: artistsWithListeningDuration});

    return recentlyPlayed;
  }
};

// How much have you listened your top artists recently ?
const getListeningDuration = (artist: Artist, recentlyPlayedList: RecentlyPlayedList): number | undefined => {
  //look in recently played tracks list to see if we can find the current artist
  const artistTrack: RecentlyPlayed | undefined  = recentlyPlayedList.items.find((track: RecentlyPlayed) => {
    //look in the current tracks artists array to see if the id for this artist is in the track
    return track.track.artists.find((artistItem) => {
      if (artistItem.id === artist.id) {
        console.log("artist is", artistItem, artistItem.id, artist.id, artistItem.id === artist.id)
        console.log("track is", track, track.track.artists[0].name)
      }
      return artistItem.id === artist.id
    })
  });
  //oops it needs to sum the durations 
  //return the duration in minutes or 0 if no duration is present
  return artistTrack?.track.duration_ms ? Math.round(artistTrack?.track.duration_ms / 1000 / 60) : 0
}

// How popular are the your top artists in terms of listen count on their most popular tracks?