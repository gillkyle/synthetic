import React, { Component } from 'react';

class Controls extends Component{
	render() {
		return (
			<div className='Controls'>
				<div onClick={this.props.onAdd} className='Button'>
					<i id='button-outer-left' className={this.props.songInLibrary ? 'fa fa-fw fa-check' : 'fa fa-fw fa-plus'}></i>
				</div>
				<div onClick={this.props.onPrev} className='Button'>
					<i className={'fa fa-fw fa-chevron-left'}></i>
				</div>
				<div onClick={this.props.onPlay} className='Button PlayButton'>
					<i className={this.props.isPlaying === 'pause' ? 'fa fa-fw fa-pause' : 'fa fa-fw fa-play'}></i>
				</div>
				<div onClick={this.props.onNext} className='Button'>
					<i className='fa fa-fw fa-chevron-right'></i>
				</div>
				<div onClick={this.props.onCreatePlaylist} className='Button'>
					<i id='button-outer-right' className={this.props.createdPlaylist ? 'fa fa-fw fa-check' : 'fa fa-fw fa-list-ul'}></i>
				</div>
			</div>
		)
	}
};

export default Controls;