import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import Spinner from 'react-spinkit';
import AlertContainer from 'react-alert';

// component imports
import Avatar from './components/Avatar/avatar';
import BigButton from './components/Button';
import PlaylistSelector from './components/PlaylistSelector/PlaylistSelector';
import SliderSelector from './components/Slider/SliderSelector';
import GenreSelector from './components/GenreSelector/GenreSelector';
import Player from './components/Player/Player';
import SongStatistics from './components/SongStats/SongStatistics';
import RadarSection from './components/Radar/RadarSection';
import HowItWorks from './components/Instructions/HowItWorks';

// css imports
import './styles/buttons.css';
import './styles/compiled-player.css';
import './styles/details.css';
import './styles/main.css';
import './styles/slider.css';

// data imports
import songApiData from './songData.json';
import songDetailData from './songDetails.json';

// helper function imports
import { calcAndSort, getHashParams, setLoginEventListener, spotifyImplicitAuth } from './javascripts/helpers';


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
      popularityValue: 50,
      filterBy: {
        energy: true,
        valence: true,
        acoustic: true,
        dance: true,
        popularity: true,
        genre: true,
      },
      songRecommendation: songApiData.items[0].track,
      params: {},
      loading: false,
      songInLibrary: false,
      queue: calcInitialQueue(),
      queueDetails: songDetailData,
      queuePosition: 0,
      createdPlaylist: false,
      seed_genres: '',
      selectedPlaylist: 0
    }
    this.nextSong = this.nextSong.bind(this);
    this.prevSong = this.prevSong.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  componentDidMount() {
    this.setState({ 
      params: getHashParams()},
      () => {
        if (this.state.params.access_token) {
          const spotifyApi = new Spotify()
          spotifyApi.setAccessToken(this.state.params.access_token);
          spotifyApi.containsMySavedTracks([this.state.songRecommendation.id])
          .then( (response) => {
            this.setState({
              songInLibrary: response[0]
            })
          })
          .catch(function(error) {
            console.error(error);
          });;
          spotifyApi.getMe().then( (response) => {
            this.setState({
              me: response
            })
          })
          .catch(function(error) {
            console.error(error);
          });
        }
      }
    );
    setLoginEventListener();
    setTimeout(() => {this.showSessionTimeout(); this.setState({ params: {} }); }, 1000 * 60 * 60);
  }
  // handle playlist change
  handlePlaylistChange = value => { console.log("changed playlist"); this.setState({ selectedPlaylist: value })};
  // adjust slider values
  handleEnergyChange = value => { this.setState({ energyValue: value }) };
  handleValenceChange = value => { this.setState({ valenceValue: value }) };
  handleAcousticChange = value => { this.setState({ acousticValue: value }) };
  handleDanceChange = value => { this.setState({ danceValue: value }) };
  handlePopularityChange = value => { this.setState({ popularityValue: value }) };
  handleGenreChange = value => { this.setState({ seed_genres: value }); }
  // handle radio buttons to select what to filter by
  toggleEnergyFilter = () => { this.setState({ filterBy: { ...this.state.filterBy, energy: !this.state.filterBy.energy } }) };
  toggleValenceFilter = () => { this.setState({ filterBy: { ...this.state.filterBy, valence: !this.state.filterBy.valence } }) };
  toggleAcousticFilter = () => { this.setState({ filterBy: { ...this.state.filterBy, acoustic: !this.state.filterBy.acoustic } }) };
  toggleDanceFilter = () => { this.setState({ filterBy: { ...this.state.filterBy, dance: !this.state.filterBy.dance } }) };
  togglePopularityFilter = () => { this.setState({ filterBy: { ...this.state.filterBy, popularity: !this.state.filterBy.popularity } }) };
  toggleGenreFilter = () => { this.setState({ filterBy: { ...this.state.filterBy, genre: !this.state.filterBy.genre } }) };

  // main calculation button 
  handleClick = () => {
    this.child.stopPlayback();
    this.setState({loading: true});
    
    const s = new Spotify();
		s.setAccessToken(this.state.params.access_token);

    // by default use the sample data
    let data = songApiData.items;
    let dataDetails = songDetailData;
    let recommendationSongIds = [];
    let calculatedData = [];

    // use more specific data with API requests
    let isSeeds = this.state.seed_genres === '' ? false : true;
    let options = {};
    if (this.state.filterBy.energy) options['target_energy'] = this.state.energyValue/100;
    if (this.state.filterBy.valence) options['target_valence'] = this.state.valenceValue/100;
    if (this.state.filterBy.acoustic) options['target_acousticness'] = this.state.acousticValue/100;
    if (this.state.filterBy.dance) options['target_danceability'] = this.state.danceValue/100;
    if (this.state.filterBy.popularity) options['target_popularity'] = this.state.popularityValue;
    if (this.state.filterBy.genre && this.state.seed_genres !== "") options['seed_genres'] = this.state.seed_genres;
    options['limit'] = 50;

    try {
      if (isSeeds && this.state.params.access_token && this.state.filterBy.genre) 
      {
        s.getRecommendations(options)
        .then((response) => {
          // override data with new recommendations
          data = response.tracks;
          let reformattedData = [];
          
          // get song ids to request details
          for (let j = 0; j < data.length; j++) { 
            recommendationSongIds.push(data[j].id); 
            reformattedData.push({track: data[j]});
          };
          s.getAudioFeaturesForTracks(recommendationSongIds, (error, response) => {
            // override details with new recommendations
            dataDetails = response.audio_features;

            calculatedData = calcAndSort(reformattedData, dataDetails, this.state);
            s.containsMySavedTracks([calculatedData[0].id])
            .then((response) => {
              this.setState({ songInLibrary: response[0] })
            })
            .catch(function(error) {
              console.error(error);
            });
            // final assignment of top calculated track, remove loading, and load the queue
            this.setState({ 
              songRecommendation: calculatedData[0], 
              loading: false,
              queue: calculatedData,
              queueDetails: dataDetails,
              queuePosition: 0,
              createdPlaylist: false
            })
            let audio = document.getElementById('audio');
            audio.load();
          });

      })
      .catch(function(error) {
        console.error(error);
      });
      } else {
      
        calculatedData = calcAndSort(data, dataDetails, this.state);
        if (this.state.params.access_token){
          s.containsMySavedTracks([calculatedData[0].id])
          .then((response) => {
            this.setState({ songInLibrary: response[0] })
          })
          .catch(function(error) {
            console.error(error);
          });
        }
        // final assignment of top calculated track, remove loading, and load the queue
        this.setState({ 
          songRecommendation: calculatedData[0], 
          loading: false,
          queue: calculatedData,
          queueDetails: dataDetails,
          queuePosition: 0,
          createdPlaylist: false
        })
        let audio = document.getElementById('audio');
        audio.load();
      
      };
    } catch (err) {
      this.showError();
      console.log(err);
    }
    // won't get stuck loading but worse UX
    this.setState({loading: false});
  };

  // control button functions (add, play/pause, next)
  addSong = () => {
		const s = new Spotify();
		s.setAccessToken(this.state.params.access_token);
    if (this.state.params.access_token !== undefined) {
      s.addToMySavedTracks([this.state.songRecommendation.id], {})
      .then(() => {
        this.setState({songInLibrary: true});
      });
      this.showAdded(this.state.songInLibrary);
    } else {
      this.showAlert();
    }
  };
  prevSong = () => {
    let state = this.state;
    let newQueuePosition = state.queuePosition - 1;
    if (newQueuePosition < 0 ) {newQueuePosition = 0;};
    const spotifyApi = new Spotify()
    spotifyApi.setAccessToken(state.params.access_token);

    // check if user has access token before making request
    if (this.state.params.access_token !== undefined) {
      spotifyApi.containsMySavedTracks([state.queue[newQueuePosition].id])
      .then( (response) => {
        this.setState({
          queuePosition: newQueuePosition,
          songRecommendation: state.queue[newQueuePosition],
          songInLibrary: response[0]
        })
        let audio = document.getElementById('audio');
        audio.load();
        this.child.stopPlayback();
      })
      .catch(function(error) {
        console.error(error);
      });;
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
  nextSong = () => {
    let state = this.state;
    let newQueuePosition = state.queuePosition + 1;
    const spotifyApi = new Spotify()
    spotifyApi.setAccessToken(state.params.access_token);

    let that = this;
    // check if user has access token before making request
    if (this.state.params.access_token !== undefined) {
      spotifyApi.containsMySavedTracks([state.queue[newQueuePosition].id])
      .then( (response) => {
        this.setState({
          queuePosition: newQueuePosition,
          songRecommendation: state.queue[newQueuePosition],
          songInLibrary: response[0]
        })
        let audio = document.getElementById('audio');
        audio.load();
        this.child.stopPlayback();
      })
      .catch(function(error) {
        console.error(error);
        that.showError();
        that.setState({ params: {} });
        setLoginEventListener();
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
  addPlaylist = () => {
		const s = new Spotify();
		s.setAccessToken(this.state.params.access_token);
    if (this.state.params.access_token !== undefined) {
      if (!this.state.createdPlaylist) 
      {
        // create blank playlist
        s.createPlaylist(this.state.me.id, {
          name: 'Music+ Recommendations',
          description: `Your generated playlist. Energy: ${this.state.energyValue}`
        })
        .then((response) => {
          this.setState({createdPlaylist: true});
          console.log(response);
          let trackURIs = [];
          for (let i = 0; i <= 25 && i < this.state.queue.length; i++) {
            trackURIs.push(this.state.queue[i].uri)
          };
          s.addTracksToPlaylist(this.state.me.id, response.id, trackURIs)
        })
        .catch(function(error) {
          console.error(error);
        });
      }

      // show msg whether playlist was created or already generated
      this.showCreatedPlaylist(this.state.createdPlaylist);
    } else {
      this.showAlert();
    }
  };
  
  
  // react alert messages and options
  alertOptions = {
    offset: 14,
    position: 'bottom right',
    theme: 'dark',
    time: 5000,
    transition: 'fade'
  }
  showAlert = () => {
    this.msg.show('Login with Spotify to add songs or playlists to your library', {
      time: 4000,
      type: 'success',
      icon: <img style={{height: 32, width: 32}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Exclamation_mark_white_icon.svg/1200px-Exclamation_mark_white_icon.svg.png" />
    })
  }
  showError = () => {
    this.msg.show('An error occured requesting info from Spotify, you may need to login', {
      time: 4000,
      type: 'error',
      icon: <img style={{height: 32, width: 32}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Exclamation_mark_white_icon.svg/1200px-Exclamation_mark_white_icon.svg.png" />
    })
  }
  showAdded = songInLibrary => {
    if (songInLibrary) {
      this.msg.show('Song has already been added to your library', {
        time: 4000,
        type: 'error',
      })
    } else {
      this.msg.show('Song added to your library', {
        time: 4000,
        type: 'success',
      })
    }
  }
  showCreatedPlaylist = createdPlaylist => {
    if (createdPlaylist) {
      this.msg.show('Playlist has already been generated with this data', {
        time: 4000,
        type: 'error',
      })
    } else {
      this.msg.show('Playlist generated from these recommendations', {
        time: 4000,
        type: 'success',
      })
    }
  }
  showSessionTimeout = () => {
    this.msg.show('Your session has expired, login again to access user-specific functions', {
      time: 0,
      type: 'success',
      icon: <img style={{height: 32, width: 32}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Exclamation_mark_white_icon.svg/1200px-Exclamation_mark_white_icon.svg.png" />
    })
  }

  render() {
    const { energyValue, valenceValue, acousticValue, danceValue, popularityValue, songRecommendation } = this.state
    return (
      <div className='App'>
        <div className='app-header'>
            <div className='app-header-title'>MUSIC+</div>
            <div className='login-section'>
              {this.state.params.access_token ? 
              <Avatar
                me={this.state.me}
              />
               :
               <BigButton
                type='button'
                id='login-button'
                className='loginButton'
                value='Login'
                onClick={() => spotifyImplicitAuth(this.state.params)}
              />
              } 
            </div>
        </div>
        <div className='playlist-selector'>
          <PlaylistSelector 
              onChange={this.handlePlaylistChange}
          />
        </div>
        <SliderSelector
          label="ENERGY"
          value={energyValue}
          onChange={this.handleEnergyChange}
          toggleFilter={this.toggleEnergyFilter}
          filterOn={this.state.filterBy.energy}
        />
        <SliderSelector
          label="VALENCE"
          value={valenceValue}
          onChange={this.handleValenceChange}
          toggleFilter={this.toggleValenceFilter}
          filterOn={this.state.filterBy.valence}
        />
        <SliderSelector
          label="ACOUSTIC"
          value={acousticValue}
          onChange={this.handleAcousticChange}
          toggleFilter={this.toggleAcousticFilter}
          filterOn={this.state.filterBy.acoustic}
        />
        <SliderSelector
          label="DANCE"
          value={danceValue}
          onChange={this.handleDanceChange}
          toggleFilter={this.toggleDanceFilter}
          filterOn={this.state.filterBy.dance}
        />
        <SliderSelector
          label="POPULARITY"
          value={popularityValue}
          onChange={this.handlePopularityChange}
          toggleFilter={this.togglePopularityFilter}
          filterOn={this.state.filterBy.popularity}
        />
        {this.state.params.access_token ? 
        <div className>
          Experimental Features
          <GenreSelector
            seed_genres={this.state.seed_genres}
            onChange={this.handleGenreChange}
            toggleFilter={this.toggleGenreFilter}
            filterOn={this.state.filterBy.genre}
          /> 
        </div>
        : null}
        <div className='calculateButton-section'>
          <BigButton
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
                <RadarSection 
                  energyValue={this.state.energyValue}
                  valenceValue={this.state.valenceValue}
                  acousticValue={this.state.acousticValue}
                  danceValue={this.state.danceValue}
                  popularityValue={this.state.popularityValue}
                  track={songRecommendation}
                  trackDetails={this.state.queueDetails.filter(object => object.id === songRecommendation.id)[0]}
                />
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
                  prevSong={this.prevSong}
                  addPlaylist={this.addPlaylist}
                  createdPlaylist={this.state.createdPlaylist}
                />
                <SongStatistics
                  track={songRecommendation}
                  trackDetails={this.state.queueDetails.filter(object => object.id === songRecommendation.id)[0]}
                />
              </div>
            </div>
          }
        </div>
        <HowItWorks />
        <div className='app-footer'>
          <a  href='https://github.com/gillkyle/musicvault' target='_blank' rel='noopener noreferrer'><i className='fa fa-github' /></a>
        </div>
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
      </div>
    );
  }
}

export default App;
