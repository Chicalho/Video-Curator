import "./MultiThumbInspector.scss";
import React from 'react';
import {Input, Label, Icon, Form, Button, Dropdown, Rating, Header} from 'semantic-ui-react';
import VideoActions from '../../actions/VideoActions';
import CreateMultiselectOptions from '../../tools/CreateMultiselectOptions';

class MultiThumbInspector extends React.Component{
	
	render(){

        var selectedThumbs = this.props.store.selectedThumbs;
        var pastStudios = this.computeTagsFieldDisplay( selectedThumbs, "studios" );
        var pastSeries = this.computeTagsFieldDisplay( selectedThumbs, "series" );
        var pastActors = this.computeTagsFieldDisplay( selectedThumbs, "actors" );
        var pastTags = this.computeTagsFieldDisplay( selectedThumbs, "tags" );

		return ( 	
			<Form>
                <Header as='h3' icon>
                    <Icon name='video' />
                    {selectedThumbs.length + " videos selected..."}
                </Header>
                <Form.Field>
                    <label>Set Rating for selection:</label>
					<Button.Group>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.rating = 0; }
                                    VideoActions.multiUpdateVDORating(selectedThumbs);
                                }}>
                            <Icon name='heart'/>
                            <Icon name='heart'/>
                            <Icon name='heart'/>
                            {this.getTotalsCount("rating", 0, selectedThumbs)}
                        </Button>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.rating = 1; }
                                    VideoActions.multiUpdateVDORating(selectedThumbs);
                                }}>
                            <Icon name='heart' color="red"/>
                            <Icon name='heart'/>
                            <Icon name='heart'/>
                            {this.getTotalsCount("rating", 1, selectedThumbs)}
                        </Button>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.rating = 2; }
                                    VideoActions.multiUpdateVDORating(selectedThumbs);
                                }}>
                            <Icon name='heart' color="red"/>
                            <Icon name='heart' color="red"/>
                            <Icon name='heart'/>
                            {this.getTotalsCount("rating", 2, selectedThumbs)}
                        </Button>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.rating = 3; }
                                    VideoActions.multiUpdateVDORating(selectedThumbs);
                                }}>
                            <Icon name='heart' color="red"/>
                            <Icon name='heart' color="red"/>
                            <Icon name='heart' color="red"/>
                            {this.getTotalsCount("rating", 3, selectedThumbs)}
                        </Button>
					</Button.Group>
				</Form.Field>
				<Form.Field>
                    <label>Set Name for selection:</label>
					<Input  value={this.computeStringFieldDisplay( selectedThumbs.map(a => a.name) )}
                            onChange={(e) => {
                                if(e.target.value == "(Mixed"){ e.target.value = ""; }
                                for(var thumb of selectedThumbs){ thumb.name = e.target.value; }
                                VideoActions.multiUpdateVDOName(selectedThumbs);
					}}/>
				</Form.Field>
				<Form.Field>
                    <label>Set Type for selection:</label>
                    <Button.Group>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.type = "None"; }
                                    VideoActions.multiUpdateVDOType(selectedThumbs);
                                }}>
                            {"None " + this.getTotalsCount("type", "None", selectedThumbs)}
                        </Button>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.type = "Clip"; }
                                    VideoActions.multiUpdateVDOType(selectedThumbs);
                                }}>
                            {"Clip " + this.getTotalsCount("type", "Clip", selectedThumbs)}
                        </Button>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.type = "Movie"; }
                                    VideoActions.multiUpdateVDOType(selectedThumbs);
                                }}>
                            {"Movie " + this.getTotalsCount("type", "Movie", selectedThumbs)}
                        </Button>
                        <Button icon
                                onClick={(e) => {
                                    for(var thumb of selectedThumbs){ thumb.type = "Scene"; }
                                    VideoActions.multiUpdateVDOType(selectedThumbs);
                                }}>
                            {"Scene " + this.getTotalsCount("type", "Scene", selectedThumbs)}
                        </Button>
                    </Button.Group>
				</Form.Field>
				{this.addMovieIdField(selectedThumbs)}
				<Form.Field>
                    <label>Studios for selection:</label>
					<Dropdown   placeholder='Studios' fluid multiple search selection allowAdditions
                                value={pastStudios} 
                                options={CreateMultiselectOptions(this.props.store.dictionary.studios)}
                                onChange={(e, data) => {
                                    var change = this.getTagAddedOrRemoved(pastStudios, data.value);
                                    VideoActions.multiUpdateVDOStudios(selectedThumbs, change.operation, change.term);
                                }}/>
				</Form.Field>
                <Form.Field>
                    <label>Series for selection:</label>
					<Dropdown   placeholder='Series' fluid multiple search selection allowAdditions
                                value={pastSeries} 
                                options={CreateMultiselectOptions(this.props.store.dictionary.series)}
                                onChange={(e, data) => {
                                    var change = this.getTagAddedOrRemoved(pastSeries, data.value);
                                    VideoActions.multiUpdateVDOSeries(selectedThumbs, change.operation, change.term);
                                }}/>
				</Form.Field>
                <Form.Field>
                    <label>Actors for selection:</label>
					<Dropdown   placeholder='Actors' fluid multiple search selection allowAdditions
                                value={pastActors} 
                                options={CreateMultiselectOptions(this.props.store.dictionary.actors)}
                                onChange={(e, data) => {
                                    var change = this.getTagAddedOrRemoved(pastActors, data.value);
                                    VideoActions.multiUpdateVDOActors(selectedThumbs, change.operation, change.term);
                                }}/>
				</Form.Field>
                <Form.Field>
                    <label>Tags for selection:</label>
					<Dropdown   placeholder='Tags' fluid multiple search selection allowAdditions
                                value={pastTags} 
                                options={CreateMultiselectOptions(this.props.store.dictionary.tags)}
                                onChange={(e, data) => {
                                    var change = this.getTagAddedOrRemoved(pastTags, data.value);
                                    VideoActions.multiUpdateVDOTags(selectedThumbs, change.operation, change.term);
                                }}/>
				</Form.Field>
			</Form>
		);
	}

	addMovieIdField(selectedThumbs){
        var typeCheck = this.computeStringFieldDisplay( selectedThumbs.map(a => a.type) );
		if(typeCheck == "Scene"){
		    return <Form.Field>
                        <label>Set Movie ID for selection (Scenes Only):</label>
						<Input  value={this.computeStringFieldDisplay( selectedThumbs.map(a => a.movieId) )}
                                onChange={(e) => {
                                    if(e.target.value == "(Mixed"){ e.target.value = ""; }
                                    for(var thumb of selectedThumbs){ thumb.movieId = e.target.value; }
                                    VideoActions.multiUpdateVDOMovieId(selectedThumbs);
							}}/>
					</Form.Field>
        }else{return ""}
    }
    
    computeStringFieldDisplay(values){
        // IF ALL VALUES ARE EQUAL OR EMPTY
        if(!!values.reduce(function(a, b){ return (a === b) ? a : NaN; }) || values[0] == ""){
            return values[0];
        }
        // IF ALL VALUES ARE DIFFERENT
        return "(Mixed)";
    }

    computeTagsFieldDisplay(thumbs, propName){
        var totalArray = [];

        for(var thumb of thumbs){ 
            totalArray = totalArray.concat(thumb[propName]);
        }

        totalArray = totalArray.filter((elem, pos, arr) => {
            return arr.indexOf(elem) == pos;
        });
        
        return totalArray;
    }

    getTotalsCount(prop, value, thumbs){
        var count = 0;
        for(var thumb of thumbs){
            if(thumb[prop] == value){
                count++;
            }
        }
        return " (" + count + ")";
    }

    getTagAddedOrRemoved(tagsBefore, tagsAfter){
        
        var change = {
            operation:undefined,
            term:undefined
        };

        var large;
        var small;

        if(tagsBefore.length > tagsAfter.length){
            large = tagsBefore;
            small = tagsAfter;
            change.operation = "remove";
        }else{
            large = tagsAfter;
            small = tagsBefore;
            change.operation = "add";
        }

        var newTag = large.filter(function (i) {
            return small.indexOf(i) === -1;
        });

        change.term = newTag[0];

        return change;
    }
}

export default MultiThumbInspector;