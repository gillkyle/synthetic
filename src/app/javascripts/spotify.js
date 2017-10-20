import Spotify from 'spotify-web-api-js';

const isInLibrary = (trackId, access_token) => {
  const spotifyApi = new Spotify()
  spotifyApi.setAccessToken(access_token);
  console.log(trackId);
  let response = spotifyApi.containsMySavedTracks([trackId], (error, response) => {
    console.log(response);
  });
  return response;
};

export { isInLibrary } 