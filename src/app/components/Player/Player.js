import React, { Component } from 'react';
import TrackInformation from './TrackInformation';
import Scrubber from './Scrubber';
import Controls from './Controls';
import Timestamps from './Timestamps';

class Player extends Component{
	constructor() {
		super();
		this.state = {
			playStatus: 'play',
			currentTime: 0
		}
	};

	updateTime = (timestamp) => {
		timestamp = Math.floor(timestamp);
		this.setState({ currentTime: timestamp });
	}

	updateScrubber = (percent) => {
		// Set scrubber width
		let innerScrubber = document.querySelector('.Scrubber-Progress');
		innerScrubber.style['width'] = percent;
	}

	togglePlay = () => {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if(status === 'play') {
			status = 'pause';
			audio.play();
			let that = this;
			setInterval(function() {
				let currentTime = audio.currentTime;
				let duration = that.props.track.duration;
				
				// Calculate percent of song
				let percent = (currentTime / duration) * 100 + '%';
				that.updateScrubber(percent);
				that.updateTime(currentTime);
			}, 100);
		} else {
			status = 'play';
			audio.pause();
		}
		this.setState({ playStatus: status });	
	};

	render() {
		return (
			<div className="Player">
				<div className="Background" style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
				<div className="Header"><div className="Title">Now playing</div></div>
				<div className="Artwork" style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
				<TrackInformation track={this.props.track} />
				<Scrubber />
				<Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
				<Timestamps duration={this.props.track.duration} currentTime={this.state.currentTime} />
				<audio id="audio">
					<source src={this.props.track.source} />
				</audio>
			</div>
		)
	}
};

Player.defaultProps = {
    track: {
        name: "We Were Young",
        artist: "Odesza",
        album: "Summer's Gone",
        year: 2012,
        artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
        duration: 192,
        source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
    }
};

export default Player;