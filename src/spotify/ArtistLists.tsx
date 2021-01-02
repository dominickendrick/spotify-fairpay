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
        <td>{artist.popularity < 50 ? "✔︎" : ""}</td>
        <td>
        {artist.popularity < 50  &&
            <div>
                <a className="actionLink" href="https://artist.site" >Buy CD/Vinyl</a>
                <a className="actionLink" href="https://artist.site" >Buy Digital</a>
                <a className="actionLink" href="https://artist.site" >Join Patreon</a>
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
            <th>Artist</th>
            <th>Specialist musician</th>
            <th>Take Action</th>
          </tr>
        </thead>
        <tbody>{listItems}</tbody>
      </table>
    );
  } else {
    return <ul></ul>;
  }
}
