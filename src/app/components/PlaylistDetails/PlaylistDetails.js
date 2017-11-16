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
        <div id="playlist-details-section-title">
          Featured Playlists and Selections
        </div>
        <div id="playlist-subheader">
          All playlists are comprised of 40-100 songs from genres the playlists
          are named after. Songs that vary more in musicality are what most of
          the playlists are made of and have been handpicked. Some songs show up
          across more than one playlist. Some artists show up multiple times on
          a single playlist and across multiple playlists as well.{" "}
        </div>
        <div style={{ gridArea: "playlists" }}>{playlistRows}</div>
      </div>
    );
  }
}

export default PlaylistDetails;
