import React, { Component } from 'react';
import axios from 'axios';
import glamorous from 'glamorous';
// import { CSSTransitionGroup } from 'react-transition-group';
import { Button } from 'semantic-ui-react';
import SpotifyButton from './components/Button';
import SongInfoWidget from './components/SongInfoWidget';
import Slider from './components/Slider/Slider'
import Spinner from 'react-spinkit'
import logo from './../logo.svg';
import './styles/App.css';
import './styles/details.css';
import './styles/buttons.css';
// import songData from './SongMetrics.json';
import songApiData from './songApiData.json';
import { getHashParams, generateRandomString, spotifyImplicitAuth} from '../javascripts/helpers';


const SliderRow = glamorous.div({
  maxWidth: 820,
  margin: "0 auto",
  paddingBottom: 35,
  lineHeight: 1.25,
  '@media only screen and (max-width: 768px)': {
    paddingBottom: 10,
  }
});

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      energyValue: 25,
      valenceValue: 50,
      depthValue: 75,
      songRecommendation: songApiData.items[0].track,
      params: {},
      loading: false
    }
  }

  componentDidMount() {
    this.setState({ params: getHashParams()});
    document.getElementById('login-button').addEventListener('click', function() {
      const stateKey = 'spotify_auth_state';
      const client_id = 'c3ac28c1b26941b5a09beaa1d33240bd'; // Your client id
      let redirect_uri = 'http://localhost:3000'; // Your redirect uri

      let state = generateRandomString();

      localStorage.setItem(stateKey, state);
      let scope = `user-read-private user-read-email user-library-read user-library-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private`;

      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + encodeURIComponent(client_id);
      url += '&scope=' + encodeURIComponent(scope);
      url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      url += '&state=' + encodeURIComponent(state);

      window.location = url;
    }, false);
  }

  handleEnergyChange = value => { this.setState({ energyValue: value }) };
  handleValenceChange = value => { this.setState({ valenceValue: value }) };
  handleDepthChange = value => { this.setState({ depthValue: value }) };

  handleClick = () => {
    console.log('calculating...');
    this.setState({loading: true})

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
          console.log(trackDetails.acousticness);

          let trackEnergy = Math.round(trackDetails.energy*100) || 0;
          let trackValence = Math.round(trackDetails.valence*100) || 0;
          let trackAcousticness = Math.round(trackDetails.acousticness*100) || 0;

          let differenceEnergy = Math.abs(trackEnergy - this.state.energyValue);
          let differenceValence = Math.abs(trackValence - this.state.valenceValue);
          let differenceAcousticness = Math.abs(trackAcousticness - this.state.depthValue);
          let totalDifference = differenceEnergy + differenceValence + differenceAcousticness;
          songObj['ResultDifference'] = totalDifference;
          calculatedData.push(songObj);
        })
        .catch((error) => {
          console.log("error", error);
        });
      promises.push(trackFeatures);
    }

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
    const { energyValue, valenceValue, depthValue, songRecommendation } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <div>
            <h2>MUSIC VAULT</h2>
            <div className="login-section">
              {this.state.params.access_token ? 
              "Logged In"
               :
               <Button
                id="login-button"
                className='loginButton'
                content='Login'
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
            <div className='slider-label'>DEPTH</div>
            <Slider
              min={0}
              max={100}
              value={depthValue}
              onChange={this.handleDepthChange}
            />
            <div className='value'>{depthValue}</div>
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
              <SongInfoWidget
                songName={songRecommendation.name}
                artist={songRecommendation.artists[0].name}
                album={songRecommendation.album.name}
                albumArt={songRecommendation.album.images[0].url}
                artSize="240"
                songPreview={songRecommendation.preview_url}
                trackId={songRecommendation.id}
              />
            </div>
          }
        </div>
        <div>
          {this.state.params ? this.state.params.access_token : ''}
        </div>
        <div className="App-footer">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
    );
  }
}

export default App;
