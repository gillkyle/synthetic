import React, { Component } from 'react';
import Carousel from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


class PlaylistSelector extends Component{
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 1
    }
  }

	render() {
    const settings = {
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      swipeToSlide: true,
      afterChange: this.props.onChange,
      variableWidth: false
    };
    return (
      <div style={{gridArea: 'carousel'}} >
        <Carousel {...settings}>
          <div><h3>{this.props.playlists[0].name}</h3></div>
          <div><h3>{this.props.playlists[1].name}</h3></div>
          <div><h3>{this.props.playlists[2].name}</h3></div>
          <div><h3>{this.props.playlists[3].name}</h3></div>
          <div><h3>{this.props.playlists[4].name}</h3></div>
          <div><h3>Spotify Library</h3></div>
        </Carousel>
      </div>
    )
  }
};

export default PlaylistSelector;