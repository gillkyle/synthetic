import $ from 'jquery';

// generate random string to prevent Cross Browser Script threats
const generateRandomString = (length) => {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// get object of query string hash params
const getHashParams = () => {
  let hashParams = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
  while ( e = r.exec(q)) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

const setLoginEventListener = () => {
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

const spotifyImplicitAuth = (stateParameters) => {
  var stateKey = 'spotify_auth_state';

  var params = getHashParams();

  var access_token = params.access_token,
      state = params.state,
      storedState = localStorage.getItem(stateKey);
  if (access_token && (state == null || state !== storedState) && (stateParameters.access_token)) {
    alert('There was an error during the authentication, you may already be authenticated');
  } else {
    localStorage.removeItem(stateKey);
    if (access_token) {
      $.ajax({
          url: 'https://api.spotify.com/v1/me',
          headers: {
            'Authorization': 'Bearer ' + access_token
          },
          success: function(response) {
            // userProfilePlaceholder.innerHTML = userProfileTemplate(response);

            $('#login').hide();
            $('#loggedin').show();
          }
      });
    } else {
        $('#login').show();
        $('#loggedin').hide();
    }

  }
};

const calcAndSort = (data, dataDetails, state) => {
  /* big huge function start */
  let calculatedData = [];
  let trackIds = [];
  
  console.log(data);
  console.log(dataDetails);
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
    let trackPopularity = Math.abs(Math.round(songObj.popularity));

    let differenceEnergy = 0, differenceValence = 0, differenceAcousticness = 0, differenceDance = 0, differencePopularity = 0;
    if (state.filterBy.energy) { differenceEnergy = Math.abs(trackEnergy - state.energyValue); }
    if (state.filterBy.valence) { differenceValence = Math.abs(trackValence - state.valenceValue); }
    if (state.filterBy.acoustic) { differenceAcousticness = Math.abs(trackAcousticness - state.acousticValue); }
    if (state.filterBy.dance) { differenceDance = Math.abs(trackDance - state.danceValue); }
    if (state.filterBy.popularity) { differencePopularity = Math.abs(trackPopularity - state.popularityValue); }
    let totalDifference = differenceEnergy + differenceValence + differenceAcousticness + differenceDance + differencePopularity;
    songObj['ResultDifference'] = totalDifference;
    if (songObj.preview_url !== null) {
      calculatedData.push(songObj);
    };

  }

  // sort by the absolute value of the subtracted entered user amount for each value and resort by that value
  calculatedData.sort(function(a, b){return a.ResultDifference - b.ResultDifference})
  return calculatedData;
}

export { calcAndSort, generateRandomString, getHashParams, setLoginEventListener, spotifyImplicitAuth };