import React, { Component } from "react";
import PlaylistDetailRow from "./PlaylistDetailRow";
import playlistsList from "../PlaylistSelector/playlistsList";

class PlaylistDetails extends Component {
  render() {
    let playlistRows = playlistsList.map(playlist => {
      return <PlaylistDetailRow key={playlist.id} playlist={playlist} />;
    });
    return (
      <div className="playlist-details-section">
        <div style={{ gridArea: "playlists" }}>{playlistRows}</div>
      </div>
    );
  }
}

export default PlaylistDetails;
