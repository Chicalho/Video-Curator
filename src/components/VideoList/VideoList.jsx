import "./VideoList.scss";

import React from 'react';
import VideoActions from '../../actions/VideoActions';
import VideoThumb 	from '../VideoThumb/VideoThumb';

class VideoList extends React.Component{
	render(){

		var store = this.props.store;
		
		return ( 	
			<ul className={"VideoList " + store.viewMode} onClickCapture={this.handleThumbClick}>
				
				{store.vdoList.map(function(videoDefinitionObject){
					return 	<VideoThumb 
								key={videoDefinitionObject.id} 
								videoDefinitionObject={videoDefinitionObject} 
								size={store.videoSize}
								selected={(store.selectedThumbs.indexOf(videoDefinitionObject) !== -1)}>
							</VideoThumb>
				})}

      		</ul>
		);
	}
	
	handleThumbClick(event){
		
		if(event.target.classList.contains("VideoList")){
			VideoActions.deselectThumbs();
		}else if( event.shiftKey == false ){
			VideoActions.deselectThumbs();			 
		}else{
			// else is clicking a VideoThumb
		}
		
	}

}

export default VideoList;