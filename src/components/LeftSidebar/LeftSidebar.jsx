import "./LeftSidebar.scss";

import React from 'react';
import StorageManager from '../../data/StorageManager';
import VideoActions from '../../actions/VideoActions';
import {Button, Icon, Form, Dropdown, Rating, Divider} from 'semantic-ui-react';
import CreateMultiselectOptions from '../../tools/CreateMultiselectOptions';

class LeftSidebar extends React.Component{
	render(){

		this.state = {
			studioFilterMode:"Any"
		};

		return ( 	
			<aside className="LeftSidebar">
				<Form>
					<Form.Field>
						<Button.Group>
							<Button icon 
									className="toggleNormalMode" 
									secondary={(this.props.store.viewMode == "normal") ? true : false}
									onClick={(e) => {
												VideoActions.changeViewMode("normal");
												}}>
								<Icon name='block layout' />
							</Button>
							<Button icon 
									className="toggleDenseMode"
									secondary={(this.props.store.viewMode == "dense") ? true : false} 
									onClick={(e) => {
												VideoActions.changeViewMode("dense");
												}}>
								<Icon name='grid layout' />
							</Button> 
						</Button.Group>
						<Form.Button onClick={StorageManager.export} className="export">Export VideoDefinitionList</Form.Button>
					</Form.Field>
					<Form.Field>
						<Button onClick={(e) => {
											VideoActions.deselectThumbs();
											VideoActions.filterListByRating(0);
											VideoActions.filterListByName(["Untitled"]);
											VideoActions.filterListByType("None");
											VideoActions.filterListByStudio(["Untagged"]);
											VideoActions.filterListBySerie(["Untagged"]);
											VideoActions.filterListByActor(["Untagged"]);
											VideoActions.filterListByTag(["Untagged"]);
										}}>Filter Uncategorized</Button>
						<Button onClick={(e) => {
											VideoActions.deselectThumbs();
											VideoActions.removeAllFilters();
										}}>Remove Filters</Button>
					</Form.Field>
					<Form.Field>
						<label>Filter by Rating:</label>
						<Rating icon='heart' 
								rating={this.props.store.filterFields.rating} 
								maxRating={3} 
								clearable={true}
								onRate={(e, data) => {
									VideoActions.deselectThumbs();
									VideoActions.filterListByRating(data.rating);
								}}/>
					</Form.Field>
					<Form.Field>
						<label>Filter by Name or Movie ID:</label>
						<Dropdown   value={this.props.store.filterFields.names}
									placeholder='Filter by name or movieId' fluid multiple search selection
									options={CreateMultiselectOptions(this.props.store.dictionary.names)}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByName(data.value);
									}}/>
					</Form.Field>	
					<Form.Field>
						<label>Filter by Type:</label>
						<Button.Group>
							<Button
								secondary={this.containsType(this, "None")}
								onClick={(e) => {
									VideoActions.deselectThumbs();
									VideoActions.filterListByType("None");
								}}
								>
								None
							</Button>
							<Button
								secondary={this.containsType(this, "Clip")}
								onClick={(e) => {
									VideoActions.deselectThumbs();
									VideoActions.filterListByType("Clip");
								}}
								>
								Clip
							</Button>	
							<Button
								secondary={this.containsType(this, "Movie")}
								onClick={(e) => {
									VideoActions.deselectThumbs();
									VideoActions.filterListByType("Movie");
								}}
								>
								Movie
							</Button>
							<Button
								secondary={this.containsType(this, "Scene")}
								onClick={(e) => {
									VideoActions.deselectThumbs();
									VideoActions.filterListByType("Scene");
								}}
								>
								Scene
							</Button>			
						</Button.Group>
					</Form.Field>
					<Form.Field>
						<label>Filter by Studio:</label>
						<Form.Group>
						<Dropdown   value={this.props.store.filterFields.studios}
									placeholder='Filter by studio' fluid multiple search selection
									options={CreateMultiselectOptions(this.props.store.dictionary.studios)}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByStudio(data.value);
									}}/>
						<Dropdown 	
									value={this.props.store.filterFields.studiosRule} 
									placeholder='Any'
									selection compact 
									options={CreateMultiselectOptions(["Any", "All"])}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByStudioRule(data.value);
									}}/>
						</Form.Group>
					</Form.Field>	
					<Form.Field>
						<label>Filter by Series:</label>
						<Form.Group>
						<Dropdown   value={this.props.store.filterFields.series}
									placeholder='Filter by serie' fluid multiple search selection
									options={CreateMultiselectOptions(this.props.store.dictionary.series)}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListBySerie(data.value);
									}}/>
						<Dropdown 	
									value={this.props.store.filterFields.seriesRule} 
									placeholder='Any'
									selection compact 
									options={CreateMultiselectOptions(["Any", "All"])}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListBySerieRule(data.value);
									}}/>
						</Form.Group>
					</Form.Field>
					<Form.Field>
						<label>Filter by Actors:</label>
						<Form.Group>
						<Dropdown   value={this.props.store.filterFields.actors}
									placeholder='Filter by actor' fluid multiple search selection
									options={CreateMultiselectOptions(this.props.store.dictionary.actors)}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByActor(data.value);
									}}/>
						<Dropdown 	
									value={this.props.store.filterFields.actorsRule} 
									placeholder='Any'
									selection compact 
									options={CreateMultiselectOptions(["Any", "All"])}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByActorRule(data.value);
									}}/>
						</Form.Group>
					</Form.Field>
					<Form.Field>
						<label>Filter by Tags:</label>
						<Form.Group>
						<Dropdown   value={this.props.store.filterFields.tags}
									placeholder='Filter by actor' fluid multiple search selection
									options={CreateMultiselectOptions(this.props.store.dictionary.tags)}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByTag(data.value);
									}}/>
						<Dropdown 	
									value={this.props.store.filterFields.tagsRule} 
									placeholder='Any'
									selection compact 
									options={CreateMultiselectOptions(["Any", "All"])}
									onChange={(e, data) => {
										VideoActions.deselectThumbs();
										VideoActions.filterListByTagRule(data.value);
									}}/>
						</Form.Group>
					</Form.Field>
				</Form>			
			</aside>
		);
	}

	containsType(context, type){
		
		if(context.props.store.filterFields.types.indexOf(type) === -1){
			return false;
		}
		return true;
	}

}

export default LeftSidebar;