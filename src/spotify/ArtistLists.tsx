import React from "react";
import { Artist } from "./ArtistsData";
import { ArtistProps } from "./ArtistsData";

export function ArtistList(props?: ArtistProps) {
  if (props && props.artists) {
    const listItems = props.artists.items.map((artist: Artist, count) => (
      <tr key={artist.id}>
          <td className="artist-position">{count + 1}</td>
        <td className="artist-image">
          <img
            className="circle-image"
            src={artist.images[2].url}
            alt={artist.name}
          ></img>
        </td>
        <td className="artist-name">{artist.name}</td>
        <td className="artist-popularity">{artist.popularity < 50 ? "✔︎" : ""}</td>
        <td>
        {//artist.popularity < 50 && 
            <div>
                <a className="actionLink" href={`https://www.google.com/search?q=${artist.name}`} >Help</a>
            </div>
        }
        </td>

      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th className="artist-name-header">Artist</th>
            <th>Specialist</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    );
  } else {
    return <ul></ul>;
  }
}
