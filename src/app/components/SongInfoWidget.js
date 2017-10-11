import React from 'react';
import glamorous from 'glamorous';

const AlbumArt = glamorous.div({
  width: 320,
  height: 320,
  margin: '0 auto'
});

const SongInfoWidget = ({ songName, artist, album, albumArt, artSize, songPreview, trackId }) => (
  <div>
    {`Title: ${songName} Artist: ${artist} Album: ${album}`}
    <AlbumArt>
      <img src={albumArt} width={artSize} height={artSize} />
    </AlbumArt>
  </div>
);

export default SongInfoWidget;