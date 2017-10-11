import React, { Component } from 'react';
import glamorous from 'glamorous';
import TrackInformation from './TrackInformation';
import Scrubber from './Scrubber';
import Controls from './Controls';
import Timestamps from './Timestamps';

const GreenPlayerDivider = glamorous.div({
	borderBottom: '3px solid #1db954'
});

class Player extends Component{
	constructor() {
		super();
		this.state = {
			playStatus: 'play',
			currentTime: 0
		}
	};

	
	componentDiDMount() {
		this.props.ref(this);
	}
	componentWillUnmount() {
		this.loadInterval && clearInterval(this.loadInterval);
		this.loadInterval = false;
	}
	method = () => {
		console.log('stuff');
	}

	updateTime = (timestamp) => {
		timestamp = Math.floor(timestamp);
		this.setState({ currentTime: timestamp });
	}

	updateScrubber = (percent) => {
		// Set scrubber width
		let innerScrubber = document.querySelector('.Scrubber-Progress');
		if (innerScrubber){innerScrubber.style['width'] = percent;}
	}

	togglePlay = () => {
		let status = this.state.playStatus;
		let audio = document.getElementById('audio');
		if(status === 'play') {
			status = 'pause';
			audio.play();
			let that = this;
			this.loadInterval = setInterval(function() {
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
				<div className="EmptyHeader"></div>
				<Timestamps duration={this.props.track.duration} currentTime={this.state.currentTime} />
				<Controls isPlaying={this.state.playStatus} onClick={this.togglePlay} />
				<GreenPlayerDivider />
				<div className="Background" style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
				<div className="Artwork" style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
				<GreenPlayerDivider />
				<TrackInformation track={this.props.track} />
				<Scrubber />
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
        artwork: "https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg",
        duration: 192,
        source: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3"
    }
};

export default Player;