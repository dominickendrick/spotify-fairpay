import React from "react";
import { ArtistProps } from "./ArtistsData";

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
        <td>
          {artist.listening_duration !== 0
            ? `${artist.listening_duration} mins`
            : ""}{" "}
        </td>
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
