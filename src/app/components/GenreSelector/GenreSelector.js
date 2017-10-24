import React, { Component } from 'react';
import glamorous from 'glamorous';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../../styles/select.css';

const options = [
  { value: 'acoustic', label: 'acoustic'},
  { value: 'alt-rock', label: 'alt-rock'},
  { value: 'alternative', label: 'alternative'},
  { value: 'ambient', label: 'ambient'},
  { value: 'bluegrass', label: 'bluegrass'},
  { value: 'blues', label: 'blues'},
  { value: 'chill', label: 'chill'},
  { value: 'classical', label: 'classical'},
  { value: 'country', label: 'country'},
  { value: 'dance', label: 'dance'},
  { value: 'deep-house', label: 'deep-house'},
  { value: 'disco', label: 'disco'},
  { value: 'drum-and-bass', label: 'drum-and-bass'},
  { value: 'dubstep', label: 'dubstep'},
  { value: 'edm', label: 'edm'},
  { value: 'electro', label: 'electro'},
  { value: 'electronic', label: 'electronic'},
  { value: 'folk', label: 'folk'},
  { value: 'happy', label: 'happy'},
  { value: 'heavy-metal', label: 'heavy-metal'},
  { value: 'hip-hop', label: 'hip-hop'},
  { value: 'indie', label: 'indie'},
  { value: 'indie-pop', label: 'indie-pop'},
  { value: 'jazz', label: 'jazz'},
  { value: 'latin', label: 'latin'},
  { value: 'metal', label: 'metal'},
  { value: 'minimal-techno', label: 'minimal-techno'},
  { value: 'piano', label: 'piano'},
  { value: 'pop', label: 'pop'},
  { value: 'progressive-house', label: 'progressive-house'},
  { value: 'punk', label: 'punk'},
  { value: 'r-n-b', label: 'r-n-b'},
  { value: 'reggae', label: 'reggae'},
  { value: 'reggaeton', label: 'reggaeton'},
  { value: 'road-trip', label: 'road-trip'},
  { value: 'rock', label: 'rock'},
  { value: 'rock-n-roll', label: 'rock-n-roll'},
  { value: 'romance', label: 'romance'},
  { value: 'sad', label: 'sad'},
  { value: 'salsa', label: 'salsa'},
  { value: 'show-tunes', label: 'show-tunes'},
  { value: 'singer-songwriter', label: 'singer-songwriter'},
  { value: 'ska', label: 'ska'},
  { value: 'sleep', label: 'sleep'},
  { value: 'soul', label: 'soul'},
  { value: 'soundtracks', label: 'soundtracks'},
  { value: 'spanish', label: 'spanish'},
  { value: 'study', label: 'study'},
  { value: 'summer', label: 'summer'},
  { value: 'synth-pop', label: 'synth-pop'},
  { value: 'techno', label: 'techno'},
  { value: 'trance', label: 'trance'},
  { value: 'work-out', label: 'work-out'}
];

class GenreSelector extends Component{
  constructor(props) {
    super(props);
    this.state = {
      stayOpen: false
    }
  }

	render() {
    const { stayOpen } = this.state;
    const { filterOn, seed_genres, onChange } = this.props;
    const RadioSelect = glamorous.span({
      color: filterOn ? "#27b7ff" : "#5e5a5a"
    });
    return (
      <div className='genre-section'>
        <div className='selector-label'>
          GENRES
        </div>
        <div style={{gridArea: 'selector'}}>
          <Select
            name="genre"
            value={seed_genres}
            multi
            simpleValue
            options={options}
            onChange={onChange}
            closeOnSelect={!stayOpen}
            placeholder="Genres to include"
          />
        </div>
        <div className='selector-details-label'>
          <div className='slider-value'>
              {seed_genres === '' ? 0 : seed_genres.split(',').length}
              <RadioSelect className='radio-select'>
                <i onClick={this.props.toggleFilter} className='fa fa-fw fa-circle-o scale-emphasis'></i>
              </RadioSelect>
            </div>
        </div>
      </div>
    )
  }
};

export default GenreSelector