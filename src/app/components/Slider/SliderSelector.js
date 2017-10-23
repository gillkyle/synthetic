import React, { Component } from 'react';
import glamorous from 'glamorous';
import Slider from './Slider';


const SliderRow = glamorous.div({
  maxWidth: 820,
  margin: '0 auto',
  paddingBottom: 20,
  lineHeight: 1.25,
  '@media only screen and (max-width: 768px)': {
    paddingBottom: 5,
  }
});


class SliderSelector extends Component{
  
  render() {
    const { label, value, filterOn } = this.props;
      const RadioSelect = glamorous.span({
        color: filterOn ? "#27b7ff" : "#5e5a5a"
      });
    return (
      <SliderRow>
        <div className='slider-grid'>
          <div className='slider-label'>{label}</div>
          <Slider
            min={0}
            max={100}
            value={value}
            onChange={this.props.onChange}
            filterOn={this.props.filterOn}
          />
          <div className='slider-value'>
            {value}
            <RadioSelect className='radio-select'>
              <i onClick={this.props.toggleFilter} className='fa fa-fw fa-circle-o scale-emphasis'></i>
            </RadioSelect>
          </div>
        </div>
      </SliderRow>
    )
  }
};

export default SliderSelector;