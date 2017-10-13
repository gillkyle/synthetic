import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous';
import SpotifyButton from './components/Button';
import Slider from './components/Slider/Slider';
import Player from './components/Player/Player';
import Spinner from 'react-spinkit'
import logo from './../logo.svg';
import './styles/main.css';
import './styles/details.css';
import './styles/buttons.css';
import './styles/compiled-player.css';
import './styles/slider.css';
import songApiData from './songApiData.json';
import { getHashParams, setLoginEventListener, spotifyImplicitAuth} from '../javascripts/helpers';


const SliderRow = glamorous.div({
  maxWidth: 820,
  margin: "0 auto",
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
      loading: false
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
    let calculatedData = [];
    let promises = [];

    // enter entire dataset loop for each song
    for (let i = 0; i < data.length; i++){
      let songObj = data[i].track;

      console.log(songObj.name);
      let trackId = songObj.id;
      // make request for track details like energy, valence for comparison, using track id
      let trackFeatures = axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, {
        headers: { 'Authorization': 'Bearer ' + this.state.params.access_token }
        })
        .then(response => {
          console.log(response.data);
          let trackDetails = response.data;

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
        })
        .catch((error) => {
          console.log("error", error);
        });
      promises.push(trackFeatures);
    }

    // gather up all the axios promises and wait until they've finished before sorting the array
    axios.all(promises).then(()=> { 

      console.log(calculatedData);
      calculatedData.sort(function(a, b){return a.ResultDifference - b.ResultDifference})
      console.log(calculatedData);

      this.setState({ songRecommendation: calculatedData[0], loading: false })
      // sort by the absolute value of the subtracted entered user amount for each value and resort by that value
      console.log('finished');
    });
    
  };

  render() {
    const { energyValue, valenceValue, acousticValue, danceValue, hipsterValue, songRecommendation } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <div>
            <h2>MUSIC VAULT</h2>
            <div className="login-section">
              {this.state.params.access_token ? 
              "Logged In"
               :
               <SpotifyButton
                type="button"
                id="login-button"
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
        <div className="calculateButton-section">
          <SpotifyButton
            type='button'
            className='calculateButton'
            value='Calculate'
            onClick={this.handleClick}
            disabled={this.state.loading}
          />
        </div>
        <div className="song-info">
          {this.state.loading ? 
            <Spinner name='line-scale-pulse-out-rapid' color='#1db954' fadeIn='quarter' /> 
            : 
            <div>
              <div className="player-section">
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
                />
              </div>
            </div>
          }
        </div>
        <div className="App-footer">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default App;
