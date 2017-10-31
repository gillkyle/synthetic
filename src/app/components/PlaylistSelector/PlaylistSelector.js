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
          <div><h3>Standard Sampler</h3></div>
          <div><h3>Indietronic</h3></div>
          <div><h3>Hipster Synthpop</h3></div>
          <div><h3>Absolute Focus</h3></div>
          <div><h3>Tropical Vibes</h3></div>
          <div><h3>Spotify Library</h3></div>
        </Carousel>
      </div>
    )
  }
};

export default PlaylistSelector;