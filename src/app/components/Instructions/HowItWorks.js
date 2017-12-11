import React, { Component } from "react";
import glamorous from "glamorous";
import "../../styles/how-it-works.css";
import TiCogOutline from "react-icons/lib/ti/cog-outline.js";
import PlaylistDetails from "../PlaylistDetails/PlaylistDetails";

const BulletPoint = glamorous.span({
  color: "#ccc",
  lineHeight: 1.5
});
const BulletLine = glamorous.div({
  marginTop: 10,
  textAlign: "center"
});

class HowItWorks extends Component {
  render() {
    return (
      <div className="instructions-section">
        <div className="hiw-text" style={{ gridArea: "section1" }}>
          <div className="title">
            <span className="fa-stack">
              <i className="fa fa-circle fa-stack-2x blue-gradient" />
              <i className="fa fa-gear fa-stack-1x fa-inverse" />
            </span>
            How it Works
          </div>
          <div className="title-subtext">
            <div className="title-subtitle">
              Adjust the levels of filters on different musical attributes from
              a specified musical selection. Calculated results are sorted and
              queued in the player based off of the difference between the input
              values and each track's actual aggregate statistics. Preview 30
              second snippets from the result set and add them to your Spotify
              library by logging in. Filter by one or more of these metrics:
            </div>
            <BulletLine>
              <BulletPoint>Energy</BulletPoint> a measure of intensity/activity
              based off of dynamic range, loudness, timbre, etc.
            </BulletLine>
            <BulletLine>
              <BulletPoint>Valence</BulletPoint> the musical positiveness
              conveyed by a track, higher valence tracks sound happier
            </BulletLine>
            <BulletLine>
              <BulletPoint>Acousticness</BulletPoint> a confidence measure of
              acousticness of a track, a higher number represents a higher
              confidence
            </BulletLine>
            <BulletLine>
              <BulletPoint>Danceability</BulletPoint> how suitable a track is
              for dancing, based off of tempo, rhythm stability, and beat
              strength
            </BulletLine>
            <BulletLine>
              <BulletPoint>Popularity</BulletPoint> popularity of a track, based
              off the total number of plays and how recent those plays are
            </BulletLine>
            <BulletLine>
              <BulletPoint>Vocalness</BulletPoint> how present vocals are in a
              track, a lower level represents a track that is more instrumental
            </BulletLine>
            <BulletLine>
              <BulletPoint>Genre</BulletPoint> only available after logging in
              and selecting the Spotify Library, choose 1-3 genres to find songs
              that correspond
            </BulletLine>
          </div>
        </div>
        <div className="hiw-text" style={{ gridArea: "section2" }}>
          <div className="title">
            <span className="fa-stack">
              <i className="fa fa-circle fa-stack-2x blue-gradient" />
              <i className="fa fa-bolt fa-stack-1x fa-inverse" />
            </span>
            Tips for Usage
          </div>
          <div className="title-subtext">
            <div className="title-subtitle">
              Experiment with different sets of filters on various playlists.
              Use fewer filters to get more defined results from the playlist
              you are searching. Extend the music you find by searching by genre
              across Spotify's entire library with the Spotify Library selection
              in the arrow menu. Try out some of these ideas to get started:
            </div>
            <BulletLine>
              <BulletPoint>Upbeat Hipster</BulletPoint> cycle through the
              playlists to find the Hipster Synthpop playlist, and calculate
              using the energy filter at a value of 100 and turn off all other
              filters by clicking the blue buttons next to each filter's row.
            </BulletLine>
            <BulletLine>
              <BulletPoint>Bass Heavy Dance</BulletPoint> use the Subwoofer
              Soundbombs playlist and set the acoustic filter at 0, and the
              dance filter at 100. Turn off all other filters.
            </BulletLine>
            <BulletLine>
              <BulletPoint>Underground Folk</BulletPoint> use the Chill Folk
              playlist and turn down popularity below 20 and mix in other
              filters for your own style of soft songs.
            </BulletLine>
            <BulletLine>
              <BulletPoint>Intense Work Out</BulletPoint> login with a Spotify
              account, find the Spotify Library selection in the arrow menu and
              filter by high energy and vocalness values. Choose work-out from
              the genre dropdown and preview the results.
            </BulletLine>
          </div>
        </div>
        <div className="hiw-text" style={{ gridArea: "section3" }}>
          <div className="title">
            <span className="fa-stack">
              <i className="fa fa-circle fa-stack-2x blue-gradient" />
              <i className="fa fa-play-circle fa-stack-1x fa-inverse" />
            </span>
            Feature Playlists and Libraries
          </div>
          <div className="title-subtext">
            <div className="title-subtitle">
              Find music from one of two libraries (Spotify Library: 30+ million
              songs, Synthetic Libray: 600+ songs) or one of many featured
              playlists (50-100 songs), from genres the playlists are named
              after. Choose from one of the following:
            </div>
            <BulletLine>
              <BulletPoint>Playlist</BulletPoint> curated lists of specific
              moods and genres for more narrowed music discovery. Playlists are
              updated regularly and contain a variety of recently released
              handselected songs.
            </BulletLine>
            <BulletLine>
              <BulletPoint>Library</BulletPoint> contain exponentially more
              songs for larger result sets and greater scope, available
              libraries are the Synthetic library and the Spotify library. To
              facilitate searching the Spotify Library you can filter by genre
              after logging in.
            </BulletLine>
          </div>
          <PlaylistDetails
            loggedIn={this.props.loggedIn}
            userId={this.props.userId}
            accessToken={this.props.accessToken}
            initialLoad={this.props.initialLoad}
          />
        </div>
        {/* <div className="hiw-image">
          <div className="hiw-image-icon">
            <TiCogOutline />
          </div>
        </div> */}
      </div>
    );
  }
}

export default HowItWorks;
