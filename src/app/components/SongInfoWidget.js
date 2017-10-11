import React from 'react';

const SongInfoWidget = ({ songName, artist, album, albumArt, artSize, songPreview, trackId }) => (
  <div style={{marginBottom: 15}}>
    {`Title: ${songName} Artist: ${artist} Album: ${album}`}
  </div>
);

export default SongInfoWidget;

52
12
7
39
56