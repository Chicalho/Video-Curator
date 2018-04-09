var AppDispatcher = require('../control/AppDispatcher');
var VideoConstants = require('../constants/VideoConstants');

var VideoActions = {

  // CHANGE_VIEW_MODE
	
	changeViewMode: function(mode) {
		AppDispatcher.dispatch({
      actionType: VideoConstants.CHANGE_VIEW_MODE,
      mode: mode
    });
  },
  
	// CHANGE_THUMB_SIZE
	
	changeThumbSize: function(size) {
		AppDispatcher.dispatch({
      actionType: VideoConstants.CHANGE_THUMB_SIZE,
      size: size
    });
	},
	
	// SELECT_THUMB
	
	selectThumb: function(videoDefinitionObject) {
		AppDispatcher.dispatch({
      actionType: VideoConstants.SELECT_THUMB,
      videoDefinitionObject: videoDefinitionObject
    });
	},
	
	// DESELECT_THUMB
	
	deselectThumb: function(videoDefinitionObject) {
		AppDispatcher.dispatch({
      actionType: VideoConstants.DESELECT_THUMB,
      videoDefinitionObject: videoDefinitionObject
    });
	},
	
	// DESELECT_THUMBS
	
	deselectThumbs: function(size) {
		AppDispatcher.dispatch({
      actionType: VideoConstants.DESELECT_THUMBS
    });
	},
	
	// UPDATE_VDO_NAME
	
  updateVDOName: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_NAME,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_TYPE
	
  updateVDOType: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_TYPE,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_MOVIE_ID
	
  updateVDOMovieId: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_MOVIE_ID,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_STUDIOS
	
  updateVDOStudios: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_STUDIOS,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_SERIES
	
  updateVDOSeries: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_SERIES,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_ACTORS
	
  updateVDOActors: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_ACTORS,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_TAGS
	
  updateVDOTags: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_TAGS,
      videoDefinitionObject: videoDefinitionObject
    });
  },
	
	// UPDATE_VDO_RATING
	
  updateVDORating: function(videoDefinitionObject) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.UPDATE_VDO_RATING,
      videoDefinitionObject: videoDefinitionObject
    });
  },

  // MULTI_UPDATE_VDO_NAME
	
  multiUpdateVDOName: function(videoDefinitionObjects) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_NAME,
      videoDefinitionObjects: videoDefinitionObjects
    });
  },

  // MULTI_UPDATE_VDO_NAME
	
  multiUpdateVDOType: function(videoDefinitionObjects) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_TYPE,
      videoDefinitionObjects: videoDefinitionObjects
    });
  },

   // MULTI_UPDATE_VDO_NAME
	
   multiUpdateVDOMovieId: function(videoDefinitionObjects) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_MOVIE_ID,
      videoDefinitionObjects: videoDefinitionObjects
    });
  },

  // MULTI_UPDATE_VDO_RATING
	
  multiUpdateVDORating: function(videoDefinitionObjects) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_RATING,
      videoDefinitionObjects: videoDefinitionObjects
    });
  },

  // MULTI_UPDATE_VDO_STUDIOS
	
  multiUpdateVDOStudios: function(videoDefinitionObjects, operation, studio) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_STUDIOS,
      videoDefinitionObjects: videoDefinitionObjects,
      operation:operation,
      studio:studio
    });
  },

  // MULTI_UPDATE_VDO_SERIES
	
  multiUpdateVDOSeries: function(videoDefinitionObjects, operation, serie) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_SERIES,
      videoDefinitionObjects: videoDefinitionObjects,
      operation:operation,
      serie:serie
    });
  },
  
  // MULTI_UPDATE_VDO_ACTORS
	
  multiUpdateVDOActors: function(videoDefinitionObjects, operation, actor) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_ACTORS,
      videoDefinitionObjects: videoDefinitionObjects,
      operation:operation,
      actor:actor
    });
  },
  
  // MULTI_UPDATE_VDO_TAGS
	
  multiUpdateVDOTags: function(videoDefinitionObjects, operation, tag) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.MULTI_UPDATE_VDO_TAGS,
      videoDefinitionObjects: videoDefinitionObjects,
      operation:operation,
      tag:tag
    });
  },

  // FILTER_LIST_BY_RATING
	
  filterListByRating: function(rating) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_RATING,
      rating: rating
    });
  },

  // FILTER_LIST_BY_NAME
	
  filterListByName: function(names) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_NAME,
      names: names
    });
  },

  // FILTER_LIST_BY_TYPE
	
  filterListByType: function(type) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_TYPE,
      type: type
    });
  },

  // FILTER_LIST_BY_STUDIO
	
  filterListByStudio: function(studios) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_STUDIO,
      studios: studios
    });
  },

  filterListByStudioRule: function(rule) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_STUDIO_RULE,
      rule: rule
    });
  },
  
  // FILTER_LIST_BY_SERIES
	
  filterListBySerie: function(series) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_SERIE,
      series: series
    });
  },

  filterListBySerieRule: function(rule) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_SERIE_RULE,
      rule: rule
    });
  },

  
  // FILTER_LIST_BY_ACTORS
	
  filterListByActor: function(actors) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_ACTOR,
      actors: actors
    });
  },

  filterListByActorRule: function(rule) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_ACTOR_RULE,
      rule: rule
    });
  },

  
  // FILTER_LIST_BY_TAGS
	
  filterListByTag: function(tags) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_TAG,
      tags: tags
    });
  },

  filterListByTagRule: function(rule) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.FILTER_LIST_BY_TAG_RULE,
      rule: rule
    });
  },

  // REMOVE_ALL_FILTERS
	
  removeAllFilters: function(tags) {
    AppDispatcher.dispatch({
      actionType: VideoConstants.REMOVE_ALL_FILTERS
    });
  }

};

module.exports = VideoActions;
