import AppDispatcher from '../control/AppDispatcher';
import {EventEmitter} from 'events';
import VideoConstants from '../constants/VideoConstants';
import Database from '../data/Database';
import assign from 'object-assign';
import Bag from '../tools/Bag';
import Filters from './Filters';
import Dictionary from './Dictionary';

var CHANGE_EVENT = 'change';

var viewMode = "normal";
var selectedThumbs = new Bag();
var filter = new Filters();

var Store = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
	
	getAll: function() {
	    return {
		    viewMode: viewMode,
            selectedThumbs:	selectedThumbs.content,
            filterFields: filter.applied,
            vdoList: filter.apply(Database.getAll()),
		    dictionary:	Dictionary.from(Database.getAll())
	    };
    }
	
});

AppDispatcher.register(function(action) {

    switch(action.actionType) {
        
        case VideoConstants.CHANGE_VIEW_MODE:
            viewMode = action.mode;
            break;

        case VideoConstants.SELECT_THUMB:
            selectedThumbs.add(action.videoDefinitionObject);
            break;
            
        case VideoConstants.DESELECT_THUMB:
            selectedThumbs.remove(action.videoDefinitionObject);
            break;
            
        case VideoConstants.DESELECT_THUMBS:
            selectedThumbs.clear();
            break;

        case VideoConstants.UPDATE_VDO_NAME:
            Database.get(action.videoDefinitionObject.id).name = action.videoDefinitionObject.name;
            break;
            
        case VideoConstants.UPDATE_VDO_TYPE:
            Database.get(action.videoDefinitionObject.id).type = action.videoDefinitionObject.type;
            break;
            
        case VideoConstants.UPDATE_VDO_MOVIE_ID:
            Database.get(action.videoDefinitionObject.id).movieId = action.videoDefinitionObject.movieId;
            break;
            
        case VideoConstants.UPDATE_VDO_STUDIOS:
            Database.get(action.videoDefinitionObject.id).studios = action.videoDefinitionObject.studios.sort();
            break;
            
        case VideoConstants.UPDATE_VDO_SERIES:
            Database.get(action.videoDefinitionObject.id).series = action.videoDefinitionObject.series.sort();
            break;
            
        case VideoConstants.UPDATE_VDO_ACTORS:
            Database.get(action.videoDefinitionObject.id).actors = action.videoDefinitionObject.actors.sort();
            break;
            
        case VideoConstants.UPDATE_VDO_TAGS:
            Database.get(action.videoDefinitionObject.id).tags = action.videoDefinitionObject.tags.sort();
            break;
            
        case VideoConstants.UPDATE_VDO_RATING:
            Database.get(action.videoDefinitionObject.id).rating = action.videoDefinitionObject.rating;
            break;
        
        case VideoConstants.MULTI_UPDATE_VDO_NAME:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                Database.get(videoDefinitionObject.id).name = videoDefinitionObject.name;
            }
            break;

        case VideoConstants.MULTI_UPDATE_VDO_TYPE:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                Database.get(videoDefinitionObject.id).type = videoDefinitionObject.type;
            }
            break;

        case VideoConstants.MULTI_UPDATE_VDO_MOVIE_ID:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                Database.get(videoDefinitionObject.id).movieId = videoDefinitionObject.movieId;
            }
            break;
            
        case VideoConstants.MULTI_UPDATE_VDO_RATING:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                Database.get(videoDefinitionObject.id).rating = videoDefinitionObject.rating;
            }
            break;
            
        case VideoConstants.MULTI_UPDATE_VDO_STUDIOS:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                if(action.operation == "add"){
                    if(videoDefinitionObject.studios.indexOf(action.studio) === -1){
                        videoDefinitionObject.studios.push(action.studio);
                    }
                }else if(action.operation == "remove"){
                    var removeIndex = videoDefinitionObject.studios.indexOf(action.studio);
                    if(removeIndex !== -1){
                        videoDefinitionObject.studios.splice(removeIndex, 1);
                    }
                }
                Database.get(videoDefinitionObject.id).studios = videoDefinitionObject.studios.sort();
            }
            break;
            
        case VideoConstants.MULTI_UPDATE_VDO_SERIES:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                if(action.operation == "add"){
                    if(videoDefinitionObject.series.indexOf(action.serie) === -1){
                        videoDefinitionObject.series.push(action.serie);
                    }
                }else if(action.operation == "remove"){
                    var removeIndex = videoDefinitionObject.series.indexOf(action.serie);
                    if(removeIndex !== -1){
                        videoDefinitionObject.series.splice(removeIndex, 1);
                    }
                }
                Database.get(videoDefinitionObject.id).series = videoDefinitionObject.series.sort();
            }
            break;
            
        case VideoConstants.MULTI_UPDATE_VDO_ACTORS:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                if(action.operation == "add"){
                    if(videoDefinitionObject.actors.indexOf(action.actor) === -1){
                        videoDefinitionObject.actors.push(action.actor);
                    }
                }else if(action.operation == "remove"){
                    var removeIndex = videoDefinitionObject.actors.indexOf(action.actor);
                    if(removeIndex !== -1){
                        videoDefinitionObject.actors.splice(removeIndex, 1);
                    }
                }
                Database.get(videoDefinitionObject.id).actors = videoDefinitionObject.actors.sort();
            }
            break;
            
        case VideoConstants.MULTI_UPDATE_VDO_TAGS:
            for(var videoDefinitionObject of action.videoDefinitionObjects){
                if(action.operation == "add"){
                    if(videoDefinitionObject.tags.indexOf(action.tag) === -1){
                        videoDefinitionObject.tags.push(action.tag);
                    }
                }else if(action.operation == "remove"){
                    var removeIndex = videoDefinitionObject.tags.indexOf(action.tag);
                    if(removeIndex !== -1){
                        videoDefinitionObject.tags.splice(removeIndex, 1);
                    }
                }
                Database.get(videoDefinitionObject.id).tags = videoDefinitionObject.tags.sort();
            }
            break;
        
        case VideoConstants.FILTER_LIST_BY_RATING:
            filter.rating = action.rating;
            break;

        case VideoConstants.FILTER_LIST_BY_NAME:
            filter.names = action.names;
            break;
            
        case VideoConstants.FILTER_LIST_BY_TYPE:
            filter.toogleTypes(action.type);
            break;

        case VideoConstants.FILTER_LIST_BY_STUDIO:
            filter.studios = action.studios;
            break;

        case VideoConstants.FILTER_LIST_BY_STUDIO_RULE:
            filter.studiosRule = action.rule;
            break;

        case VideoConstants.FILTER_LIST_BY_SERIE:
            filter.series = action.series;
            break;
    
        case VideoConstants.FILTER_LIST_BY_SERIE_RULE:
            filter.seriesRule = action.rule;
            break;
    
        case VideoConstants.FILTER_LIST_BY_ACTOR:
            filter.actors = action.actors;
            break;
    
        case VideoConstants.FILTER_LIST_BY_ACTOR_RULE:
            filter.actorsRule = action.rule;
            break;
        
        case VideoConstants.FILTER_LIST_BY_TAG:
            filter.tags = action.tags;
            break;
    
        case VideoConstants.FILTER_LIST_BY_TAG_RULE:
            filter.tagsRule = action.rule;
            break;

        case VideoConstants.REMOVE_ALL_FILTERS:
            filter.clear();
            break;
            
    }

    Store.emitChange();
});

export default Store;