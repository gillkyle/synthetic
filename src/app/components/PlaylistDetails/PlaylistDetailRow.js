import React, { Component } from "react";
import "../../styles/playlist-details.css";
import Button from "../Button";
import Spotify from "spotify-web-api-js";

class PlaylistDetailRow extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      following: false,
      beenChanged: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // easier to read conditions for whether the row should update to show a change in the following button
    let shouldUpdate = true;
    if (nextProps.userId === null) {
      shouldUpdate = false;
    }
    if (nextProps.loggedIn === false) {
      shouldUpdate = false;
    }
    if (nextProps.initialLoad === false) {
      shouldUpdate = false;
    }
    if (nextState.following === true && this.state.following === true) {
      shouldUpdate = false;
    }
    return shouldUpdate;
  }

  onClickFollow() {
    // follow playlist
    if (!this.props.loggedIn) {
      this.props.showFollowAlert();
    } else if (!this.state.following) {
      const spotifyApi = new Spotify();
      spotifyApi.setAccessToken(this.props.accessToken);
      spotifyApi
        .followPlaylist(this.props.playlist.owner.id, this.props.playlist.id)
        .then(response => {
          if (response[0] == true) {
            this.setState({
              following: true
            });
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    } else if (this.state.following) {
      // unfollow playlist
      const spotifyApi = new Spotify();
      spotifyApi.setAccessToken(this.props.accessToken);
      spotifyApi
        .unfollowPlaylist(this.props.playlist.owner.id, this.props.playlist.id)
        .then(response => {
          if (response[0] == true) {
            this.setState({
              following: false
            });
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    }
    this.setState({
      following: !this.state.following,
      beenChanged: true
    });
  }

  render() {
    //console.log(this.props);
    if (this.props.loggedIn && !this.state.beenChanged) {
      const spotifyApi = new Spotify();
      spotifyApi.setAccessToken(this.props.accessToken);
      spotifyApi
        .areFollowingPlaylist(
          this.props.playlist.owner.id,
          this.props.playlist.id,
          [this.props.userId]
        )
        .then(response => {
          if (response[0] == true) {
            this.setState({
              following: true
            });
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    }

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
              onClick={() => this.onClickFollow()}
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
