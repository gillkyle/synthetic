import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';
import glamorous from 'glamorous';
import TrackInformation from './TrackInformation';
import Scrubber from './Scrubber';
import Controls from './Controls';
import Timestamps from './Timestamps';
import { getHashParams } from '../../../javascripts/helpers';


const GreenPlayerDivider = glamorous.div({
	borderBottom: '3px solid #1db954'
});

class Player extends Component{
	constructor(props) {
		super(props);
		this.state = {
			playStatus: 'play',
			currentTime: 0,
			songInLibrary: props.songInLibrary
		}
	};

	componentDiDMount() {
		console.log('rerender player');
		this.props.ref(this);
		this.setState({
			currentTime: 0,
			playStatus: 'play',
			songInLibrary: this.props.songInLibrary
		});
	}
	componentWillUnmount() {
		this.loadInterval && clearInterval(this.loadInterval);
		this.loadInterval = false;
	}
	shouldComponentUpdate(nextProps, nextState) {
		return (nextProps.track.name !== this.props.track.name) ||
		 (nextProps.track.source !== this.props.track.source) || 
		 (this.props.songInLibrary !== nextProps.songInLibrary) || 
		 (this.state.playStatus !== nextState.playStatus) ||
		 (this.state.currentTime !== nextState.currentTime);
	}

	method = () => {
		console.log('stuff');
		let audio = document.getElementById('audio');
		audio.pause();
		this.setState({ playStatus: 'play' });	
		audio.load();
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

	addSong = () => {
		console.log('add song to library');
		const s = new Spotify();
		s.setAccessToken(this.props.access_token);
		s.addToMySavedTracks([this.props.trackId], {}, (error, response) => {
			console.log(error); 
			this.setState({songInLibrary: true});
		});
	};

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

	loadNext = () => {
		console.log('play next song');
	};

	render() {
		let params = getHashParams();
		const { access_token, trackId } = this.props;

		return (
			<div className='Player'>
				<div className='EmptyHeader'></div>
				<Timestamps duration={this.props.track.duration} currentTime={this.state.currentTime} />
				<Controls songInLibrary={this.props.songInLibrary} isPlaying={this.state.playStatus} onAdd={this.addSong} onPlay={this.togglePlay} onNext={this.props.nextSong} />
				<GreenPlayerDivider />
				<div className='Background' style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
				<div className='Artwork' style={{'backgroundImage': 'url(' + this.props.track.artwork + ')'}}></div>
				<GreenPlayerDivider />
				<TrackInformation track={this.props.track} />
				<Scrubber />
				<audio id='audio'>
					<source src={this.props.track.source} />
				</audio>
			</div>
		)
	}
};

Player.defaultProps = {
    track: {
        name: 'We Were Young',
        artist: 'Odesza',
        album: 'Summers Gone',
        artwork: 'https://funkadelphia.files.wordpress.com/2012/09/odesza-summers-gone-lp.jpg',
        duration: 192,
        source: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3'
    }
};

export default Player;