import React from 'react';
import glamorous from 'glamorous';

const SongInfoWidget = ({ songName, artist, album, albumArt, artSize, songPreview, trackId }) => (
  <div style={{marginBottom: 15}}>
    {`Title: ${songName} Artist: ${artist} Album: ${album}`}
  </div>
);

export default SongInfoWidget;