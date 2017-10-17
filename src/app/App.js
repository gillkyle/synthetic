import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios';
import glamorous from 'glamorous';
import SpotifyButton from './components/Button';
import Slider from './components/Slider/Slider';
import Player from './components/Player/Player';
import Spinner from 'react-spinkit'
import './styles/main.css';
import './styles/details.css';
import './styles/buttons.css';
import './styles/compiled-player.css';
import './styles/slider.css';
import songApiData from './songData.json';
import songDetailData from './songDetails.json';
import { getHashParams, setLoginEventListener, spotifyImplicitAuth} from '../javascripts/helpers';


const SliderRow = glamorous.div({
  maxWidth: 820,
  margin: '0 auto',
  paddingBottom: 20,
  lineHeight: 1.25,
  '@media only screen and (max-width: 768px)': {
    paddingBottom: 5,
  }
});

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
      queue: songApiData.items,
      queuePosition: 0,
    }
  }

  componentDidMount() {
    this.setState({ params: getHashParams()});
    setLoginEventListener();
  }

  handleEnergyChange = value => { this.setState({ energyValue: value }) };
  handleValenceChange = value => { this.setState({ valenceValue: value }) };
  handleAcousticChange = value => { this.setState({ acousticValue: value }) };
  handleDanceChange = value => { this.setState({ danceValue: value }) };
  handleHipsterChange = value => { this.setState({ hipsterValue: value }) };

  handleClick = () => {
    console.log('starting...');
    this.setState({loading: true});
    this.child.method();

    let data = songApiData.items;
    let dataDetails = songDetailData;
    let calculatedData = [];
    let promises = [];
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

    s.containsMySavedTracks([calculatedData[0].id], (error, response) => {
      console.log('the response');
      console.log(response[0]);
			if (response[0] === true) {
        this.setState({songInLibrary: true});
        console.log('song true');
      } else {
        this.setState({songInLibrary: false})
        console.log('song false');
      }
		});

    this.setState({ songRecommendation: calculatedData[0], loading: false })
    let audio = document.getElementById('audio');
		audio.load();
    console.log('audio loaded');
  };
  
  nextSong = () => {
    console.log('next song');
    let newQueuePosition = this.state.queuePosition + 1
    this.setState({
      queuePosition: newQueuePosition,
      songRecommendation: this.state.queue[newQueuePosition].track
    })
    let audio = document.getElementById('audio');
    audio.load();
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
        <SliderRow>
          <div className='slider-grid'>
            <div className='slider-label'>ENERGY</div>
            <Slider
              min={0}
              max={100}
              value={energyValue}
              onChange={this.handleEnergyChange}
            />
            <div className='value'>{energyValue}</div>
          </div>
        </SliderRow>
        <SliderRow>
          <div className='slider-grid'>
            <div className='slider-label'>VALENCE</div>
            <Slider
              min={0}
              max={100}
              value={valenceValue}
              onChange={this.handleValenceChange}
            />
            <div className='value'>{valenceValue}</div>
          </div>
        </SliderRow>
        <SliderRow>
          <div className='slider-grid'>
            <div className='slider-label'>ACOUSTIC</div>
            <Slider
              min={0}
              max={100}
              value={acousticValue}
              onChange={this.handleAcousticChange}
            />
            <div className='value'>{acousticValue}</div>
          </div>
        </SliderRow>
        <SliderRow>
          <div className='slider-grid'>
            <div className='slider-label'>DANCE</div>
            <Slider
              min={0}
              max={100}
              value={danceValue}
              onChange={this.handleDanceChange}
            />
            <div className='value'>{danceValue}</div>
          </div>
        </SliderRow>
        <SliderRow>
          <div className='slider-grid'>
            <div className='slider-label'>HIPSTER</div>
            <Slider
              min={0}
              max={100}
              value={hipsterValue}
              onChange={this.handleHipsterChange}
            />
            <div className='value'>{hipsterValue}</div>
          </div>
        </SliderRow>
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
            <Spinner name='line-scale-pulse-out-rapid' color='#1db954' fadeIn='quarter' /> 
            : 
            <div>
              <div className='player-section'>
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
                />
              </div>
            </div>
          }
        </div>
        <div className='App-footer'>
          <a  href='https://github.com/gillkyle/musicvault' target='_blank' rel='noopener noreferrer'><i className='fa fa-github' /></a>
        </div>
      </div>
    );
  }
}

export default App;
