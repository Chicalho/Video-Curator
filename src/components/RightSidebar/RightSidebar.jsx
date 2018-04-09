import "./RightSidebar.scss";
import React from 'react';
import SingleThumbInspector from './SingleThumbInspector';
import MultiThumbInspector from './MultiThumbInspector';

class RightSidebar extends React.Component{
	
	render(){
		return ( 	
			<aside className="RightSidebar">
				{this.renderToggle()}
			</aside>
		);
	}
	
	renderToggle(){

		var selectedThumbs = this.props.store.selectedThumbs;
		
		if(selectedThumbs.length == 0){
			return <p>renderNoThumbSelected</p>
		}else if(selectedThumbs.length == 1){
			return <SingleThumbInspector store={this.props.store} />
		}else{
			return <MultiThumbInspector store={this.props.store} />
		}
	}
}

export default RightSidebar;