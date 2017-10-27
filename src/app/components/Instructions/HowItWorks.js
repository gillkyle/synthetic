import React, { Component } from 'react';
import '../../styles/how-it-works.css';
import * as Fa from 'react-icons/lib/fa'

class HowItWorks extends Component{
  render() {
    return (
      <div className='instructions-section'>
        <div className='title'>How it Works</div>
          Spotify is linked up to calculate tracks based on your own tastes. Customize different track characteristics and preview music to add to your library straight from the browser.
        <div className='section-3-col'>
          <div className='section' style={{gridArea: 'section1'}}>
            <div className='subtitle-icon'><Fa.FaWrench /></div>
            <div className='subtitle'>Customize</div>
            <div className='content'>
              <div className='content-step'>
                <Fa.FaChevronCircleLeft /><Fa.FaChevronCircleRight /> Select a playlist
              </div>
              <div className='content-step'>
                <Fa.FaSliders /> Adjust filter levels
              </div>
              <div className='content-step'>
                <Fa.FaCircleO /> Turn filters on/off 
              </div>
              <div className='content-step'>
                <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" height="1em" width="1em" viewBox="0 0 40 40" style={{verticalAlign: 'middle', marginRight: 5, marginBottom: 2}}><g><path d="m0 20q0-2.5 1-4.8t2.6-4 4-2.6 4.8-1h14.9q2.6 0 4.9 1t3.9 2.6 2.7 4 1 4.8-1 4.8-2.7 4-3.9 2.6-4.9 1h-14.9q-2.5 0-4.8-1t-4-2.6-2.6-4-1-4.8z m27.3 9.9q2 0"></path></g></svg> 
                Calculate
              </div>
            </div>
          </div>
          <div className='section' style={{gridArea: 'section2'}} >
            <div className='subtitle-icon'><Fa.FaHeadphones /></div>
            <div className='subtitle'>Discover</div>
            <div className='content'>
              <div className='content-step'>
                <Fa.FaPlayCircleO /><Fa.FaPauseCircleO />  Play/Pause a song
              </div>
              <div className='content-step'>
                <Fa.FaChevronLeft /><Fa.FaChevronRight /> Cycle through songs in result set
              </div>
              <div className='content-step'>
                <Fa.FaPlus /> Add song to your library on Spotify
              </div>
              <div className='content-step'>
                <Fa.FaList /> Add top results into a playlist
              </div>
            </div>
          </div>
          <div className='section' style={{gridArea: 'section3'}}>
          <div className='subtitle-icon'><Fa.FaEye /></div>
            <div className='subtitle'>Visualize</div>
            <div className='content'>
              <div className='content-step'>
                Easily digest song stats
              </div>
              <div className='content-step'>
                Compare your search to actual stats
              </div>
              <div className='content-step'>
                Avoid songs with explicit lyrics
              </div>
              <div className='content-step'>
                Sort instrumental and vocal tracks
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default HowItWorks;