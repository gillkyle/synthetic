import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import glamorous from 'glamorous';
import Spinner from 'react-spinkit'

// component imports
import SpotifyButton from './components/Button';
import SliderSelector from './components/Slider/SliderSelector';
import Player from './components/Player/Player';
import SongStatistics from './components/SongStats/SongStatistics';

// css imports
import './styles/buttons.css';
import './styles/compiled-player.css';
import './styles/details.css';
import './styles/main.css';
import './styles/slider.css';
import './styles/song-statistics.css';

// data imports
import songApiData from './songData.json';
import songDetailData from './songDetails.json';

// helper function imports
import { getHashParams, setLoginEventListener, spotifyImplicitAuth} from '../javascripts/helpers';


const calcInitialQueue = () => {
  let queue = [];
  let data = songApiData.items;
  for (let i = 0; i < data.length; i++){
    queue.push(data[i].track);
  }
  return queue;
}

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      energyValue: 50,
      valenceValue: 50,
      acousticValue: 50,
      danceValue: 50,
      hipsterValue: 50,
      songRecommendation: songApiData.items[0].track,
      params: {},
      loading: false,
      songInLibrary: false,
      queue: calcInitialQueue(),
      queuePosition: 0
    }
    this.nextSong = this.nextSong.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  componentDidMount() {
    this.setState({ params: getHashParams()});
    setLoginEventListener();
    const spotifyApi = new Spotify()
    spotifyApi.setAccessToken(this.state.params.access_token);
    spotifyApi.containsMySavedTracks([this.state.songRecommendation.id])
    .then( (response) => {
      console.log(response);
      this.setState({
        songInLibrary: response[0]
      })
    });
  }

  handleEnergyChange = value => { this.setState({ energyValue: value }) };
  handleValenceChange = value => { this.setState({ valenceValue: value }) };
  handleAcousticChange = value => { this.setState({ acousticValue: value }) };
  handleDanceChange = value => { this.setState({ danceValue: value }) };
  handleHipsterChange = value => { this.setState({ hipsterValue: value }) };

  handleClick = () => {
    console.log('starting...');
    this.setState({loading: true});
    this.child.stopPlayback();

    let data = songApiData.items;
    let dataDetails = songDetailData;
    let calculatedData = [];
    let trackIds = [];
    const s = new Spotify();
		s.setAccessToken(this.state.params.access_token);

    // enter entire dataset loop for each song
    for (let i = 0; i < data.length; i++){
      let songObj = data[i].track;
      let songDetails = dataDetails[i];

      let trackId = songObj.id;
      trackIds.push(trackId);

      let trackDetails = songDetails;

      let trackEnergy = Math.round(trackDetails.energy*100) || 0;
      let trackValence = Math.round(trackDetails.valence*100) || 0;
      let trackAcousticness = Math.round(trackDetails.acousticness*100) || 0;
      let trackDance = Math.round(trackDetails.danceability*100) || 0;
      let trackHipster = Math.abs(Math.round(songObj.popularity-100));

      let differenceEnergy = Math.abs(trackEnergy - this.state.energyValue);
      let differenceValence = Math.abs(trackValence - this.state.valenceValue);
      let differenceAcousticness = Math.abs(trackAcousticness - this.state.acousticValue);
      let differenceDance = Math.abs(trackDance - this.state.danceValue);
      let differenceHipster = Math.abs(trackHipster - this.state.hipsterValue);
      let totalDifference = differenceEnergy + differenceValence + differenceAcousticness + differenceDance + differenceHipster;
      songObj['ResultDifference'] = totalDifference;
      calculatedData.push(songObj);

    }

    console.log(trackIds);
    // s.getAudioFeaturesForTracks(trackIds, (error, response) => {
		// 	console.log(response); 
		// });

    // sort by the absolute value of the subtracted entered user amount for each value and resort by that value
    console.log(calculatedData);
    calculatedData.sort(function(a, b){return a.ResultDifference - b.ResultDifference})
    console.log(calculatedData);

    if (this.state.params.access_token){
      s.containsMySavedTracks([calculatedData[0].id])
      .then((response) => {
        console.log('in songs');
        console.log(response);
        this.setState({ songInLibrary: response[0] })
      });
    }
    
    // final assignment of top calculated track, remove loading, and load the queue
    this.setState({ 
      songRecommendation: calculatedData[0], 
      loading: false,
      queue: calculatedData,
      queuePosition: 0
    })
    let audio = document.getElementById('audio');
		audio.load();
    console.log('audio loaded');
  };
  
  nextSong = () => {
    console.log('next song');
    let state = this.state;
    let newQueuePosition = state.queuePosition + 1;
    const spotifyApi = new Spotify()
    spotifyApi.setAccessToken(state.params.access_token);

    // check if user has access token before making request
    if (this.state.params.access_token !== undefined) {
      spotifyApi.containsMySavedTracks([state.queue[newQueuePosition].id])
      .then( (response) => {
        console.log('in library');
        console.log(response);
        this.setState({
          queuePosition: newQueuePosition,
          songRecommendation: state.queue[newQueuePosition],
          songInLibrary: response[0]
        })
        let audio = document.getElementById('audio');
        audio.load();
        this.child.stopPlayback();
      });
    } else {
      this.setState({
        queuePosition: newQueuePosition,
        songRecommendation: state.queue[newQueuePosition]
      })
      let audio = document.getElementById('audio');
      audio.load();
      this.child.stopPlayback();
    }

  };

  addSong = () => {
		console.log('add song to library');
		const s = new Spotify();
		s.setAccessToken(this.state.params.access_token);
    if (this.state.params.access_token !== undefined) {
      s.addToMySavedTracks([this.state.songRecommendation.id], {})
      .then(() => {
        this.setState({songInLibrary: true});
      });
    } else {
      window.alert('login to add songs to library');
    }
	};

  render() {
    const { energyValue, valenceValue, acousticValue, danceValue, hipsterValue, songRecommendation } = this.state
    return (
      <div className='App'>
        <div className='App-header'>
          <div>
            <h2>MUSIC VAULT</h2>
            <div className='login-section'>
              {this.state.params.access_token ? 
              'Logged In'
               :
               <SpotifyButton
                type='button'
                id='login-button'
                className='loginButton'
                value='Login'
                onClick={() => spotifyImplicitAuth()}
              />
              } 
            </div>
          </div>
          <h4>Adjust the sliders and press calculate to receive an algorithmically generated recommendation.</h4>
        </div>
        <SliderSelector
          label="ENERGY"
          value={energyValue}
          onChange={this.handleEnergyChange}
        />
        <SliderSelector
          label="VALENCE"
          value={valenceValue}
          onChange={this.handleValenceChange}
        />
        <SliderSelector
          label="ACOUSTIC"
          value={acousticValue}
          onChange={this.handleAcousticChange}
        />
        <SliderSelector
          label="DANCE"
          value={danceValue}
          onChange={this.handleDanceChange}
        />
        <SliderSelector
          label="HIPSTER"
          value={hipsterValue}
          onChange={this.handleHipsterChange}
        />
        <div className='calculateButton-section'>
          <SpotifyButton
            type='button'
            className='calculateButton'
            value='Calculate'
            onClick={this.handleClick}
            disabled={this.state.loading}
          />
        </div>
        <div className='song-info'>
          {this.state.loading ? 
            <Spinner name='line-scale-pulse-out-rapid' color='#34BAFD' fadeIn='quarter' /> 
            : 
            <div>
              <div className='player-section'>
                <div style={{width: 300, margin: 20}}>.</div>
                <Player 
                  access_token={this.state.params.access_token}
                  trackId={songRecommendation.id}
                  track={{
                    name: songRecommendation.name,
                    artist: songRecommendation.artists[0].name,
                    album: songRecommendation.album.name,
                    artwork: songRecommendation.album.images[0].url,
                    duration: 30,
                    source: songRecommendation.preview_url
                  }}
                  ref={ref => (this.child = ref)}
                  songInLibrary={this.state.songInLibrary}
                  nextSong={this.nextSong}
                  addSong={this.addSong}
                />
                <SongStatistics
                  track={songRecommendation}
                  trackDetails={songDetailData[this.state.queuePosition]}
                />
              </div>
            </div>
          }
        </div>
        <div className="instructions">
          <h2>HOW IT WORKS</h2>
        </div>
        <div className='App-footer'>
          <a  href='https://github.com/gillkyle/musicvault' target='_blank' rel='noopener noreferrer'><i className='fa fa-github' /></a>
        </div>
      </div>
    );
  }
}

export default App;
