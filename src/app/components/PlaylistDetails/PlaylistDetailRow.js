import React, { Component } from "react";
import "../../styles/playlist-details.css";
import Button from "../Button";

class PlaylistDetailRow extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      following: false
    };
  }

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
        <div className="playlist-info">
          <div className="playlist-name">{this.props.playlist.name}</div>
          <div className="playlist-description">
            {this.props.playlist.description || "description"}
          </div>
          <div>
            <Button
              className="followButton"
              type="button"
              value={
                this.state.following ? (
                  <span style={{ color: "#70D5FF" }}>Following</span>
                ) : (
                  <span>Follow</span>
                )
              }
            >
              Follow
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaylistDetailRow;
