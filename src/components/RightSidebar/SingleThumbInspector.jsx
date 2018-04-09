import "./SingleThumbInspector.scss";
import React from 'react';
import {Input, Label, Icon, Form, Button, Dropdown, Rating} from 'semantic-ui-react';
import VideoActions from '../../actions/VideoActions';
import CreateMultiselectOptions from '../../tools/CreateMultiselectOptions';

class SingleThumbInspector extends React.Component{
	
	render(){

        var selectedThumb = this.props.store.selectedThumbs[0];

		return ( 	
			<Form>
				<Form.Field>
					<Label size="mini"><Icon name='add to calendar'/>{selectedThumb.dateCreated}</Label>
				</Form.Field>
				{/*<Form.Field>
					<Label size="mini"><Icon name='id badge'/>{selectedThumb.id}</Label>
				</Form.Field>*/}
				<Form.Field>
					<Label size="mini"><Icon name='at'/>{selectedThumb.filePath}</Label>
				</Form.Field>
				<Form.Field>
					<Label ><Icon name='eye'/>Watched {selectedThumb.watched} times...</Label>
					<Label ><Icon name='checked calendar'/>Last watched on {selectedThumb.lastWatched}</Label>
				</Form.Field>
				<Form.Field>
					<label>Set Rating:</label>
					<Rating icon='heart' 
									rating={selectedThumb.rating} 
									maxRating={3} 
									clearable={true}
									onRate={(e, data) => {
										selectedThumb.rating = data.rating;
										VideoActions.updateVDORating(selectedThumb);
									}}/>
				</Form.Field>
				<Form.Field>
					<label>Set Name:</label>
					<Input value={selectedThumb.name}
							 onChange={(e) => {
							 	 selectedThumb.name = e.target.value;
							   VideoActions.updateVDOName(selectedThumb);
					}}/>
				</Form.Field>
				<Form.Field>
					<label>Set Type:</label>
					<Button.Group>
						<Button secondary={(selectedThumb.type == "None") ? true : false}
								onClick={(e) => {
									selectedThumb.type = "None";
									VideoActions.updateVDOType(selectedThumb);
								}}>None</Button>
						<Button secondary={(selectedThumb.type == "Clip") ? true : false}
								onClick={(e) => {
									selectedThumb.type = "Clip";
									VideoActions.updateVDOType(selectedThumb);
								}}>Clip</Button>
						<Button secondary={(selectedThumb.type == "Movie") ? true : false}
								onClick={(e) => {
									selectedThumb.type = "Movie";
									VideoActions.updateVDOType(selectedThumb);
								}}>Movie</Button>
						<Button secondary={(selectedThumb.type == "Scene") ? true : false}
								onClick={(e) => {
									selectedThumb.type = "Scene";
									VideoActions.updateVDOType(selectedThumb);
								}}>Scene</Button>
					</Button.Group>
				</Form.Field>
				{this.addMovieIdField(selectedThumb)}
				<Form.Field>
					<label>Studios:</label>
					<Dropdown placeholder='Studios' fluid multiple search selection allowAdditions
										value={selectedThumb.studios} 
										options={CreateMultiselectOptions(this.props.store.dictionary.studios)}
										onChange={(e, data) => {
											selectedThumb.studios = data.value;
											VideoActions.updateVDOStudios(selectedThumb);
									  }}/>
				</Form.Field>
				<Form.Field>
					<label>Series:</label>
					<Dropdown placeholder='Series' fluid multiple search selection allowAdditions
										value={selectedThumb.series} 
										options={CreateMultiselectOptions(this.props.store.dictionary.series)}
										onChange={(e, data) => {
											selectedThumb.series = data.value;
											VideoActions.updateVDOSeries(selectedThumb);
									  }}/>
				</Form.Field>
				<Form.Field>
					<label>Actors:</label>
					<Dropdown placeholder='Actors' fluid multiple search selection allowAdditions
										value={selectedThumb.actors} 
										options={CreateMultiselectOptions(this.props.store.dictionary.actors)}
										onChange={(e, data) => {
											selectedThumb.actors = data.value;
											VideoActions.updateVDOActors(selectedThumb);
									  }}/>
				</Form.Field>
				<Form.Field>
					<label>Tags:</label>
					<Dropdown placeholder='Tags' fluid multiple search selection allowAdditions
										value={selectedThumb.tags} 
										options={CreateMultiselectOptions(this.props.store.dictionary.tags)}
										onChange={(e, data) => {
											selectedThumb.tags = data.value;
											VideoActions.updateVDOTags(selectedThumb);
									  }}/>
				</Form.Field>
			</Form>
		);
	}

	addMovieIdField(selectedThumb){
		if(selectedThumb.type == "Scene"){
		return <Form.Field>
				<label>Set Movie ID (Scenes Only):</label>
					<Input value={selectedThumb.movieId}
								onChange={(e) => {
									selectedThumb.movieId = e.target.value;
									VideoActions.updateVDOMovieId(selectedThumb);
					}}/>
				</Form.Field>
		}else{return ""}
	}
}

export default SingleThumbInspector;