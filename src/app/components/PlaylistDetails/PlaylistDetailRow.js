import React, { Component } from "react";
import "../../styles/playlist-details.css";

class PlaylistDetailRow extends Component {
  render() {
    return (
      <div className="playlist-detail-row">
        <div style={{ gridArea: "playlist-art" }}>
          <img
            src={this.props.playlist.images[0].url}
            style={{ width: "175px", height: "175px" }}
            alt="playlist art"
          />
        </div>
        <div className="playlist-description">
          <div className="playlist-name">{this.props.playlist.name}</div>
          <div>{this.props.playlist.description || "description"}</div>
          <div>Follow</div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetailRow;
