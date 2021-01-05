import React from "react";
import { Artist } from "./ArtistsData";
import { ArtistProps } from "./ArtistsData";

export function ArtistList(props?: ArtistProps) {
  if (props && props.artists) {
    const listItems = props.artists.items.map((artist: Artist, count) => (
      <tr key={artist.id}>
        <td>
          <img
            className="circle-image"
            src={artist.images[2].url}
            alt={artist.name}
          ></img>
        </td>
        <td>{artist.name}</td>
        <td>{artist.popularity < 50 ? "✔︎" : ""}</td>
        <td>
        {artist.popularity < 50 && 
            <div>
                <a className="actionLink" href={artist.external_urls.website} >Help</a>
            </div>
        }
        </td>

      </tr>
    ));
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Artist</th>
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
