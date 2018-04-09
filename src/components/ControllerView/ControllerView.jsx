import "./ControllerView.scss";
import React from 'react';
import LeftSidebar from "../LeftSidebar/LeftSidebar";
import RightSidebar from "../RightSidebar/RightSidebar";
import VideoList from "../VideoList/VideoList";
import Store from '../../stores/Store';
import StorageManager from "../../data/StorageManager";
import Database from "../../data/Database";

class ControllerView extends React.Component{
	
	constructor() {
		super();
		this._onChange = this._onChange.bind(this);
        this.state = Store.getAll();
	}
	
	componentDidMount() {
		Store.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		Store.removeChangeListener(this._onChange);
	}
	
	render(){
		return ( 	
			<div>
                <LeftSidebar store={this.state}/>
				<VideoList store={this.state}/>
				<RightSidebar store={this.state}/>
			</div>
		);
	}
	
	_onChange(){
        this.setState(Store.getAll());
		StorageManager.save( Database.getAll() );
		//StorageManager.export();
    }
    
}

export default ControllerView;