import IntersectArrays from '../tools/IntersectArrays';

class Filters{

    constructor(){
        this.applied = this.empty;
    }

    get empty(){
        return {
            rating:0,
            names:[],
            types:[],
            studios: [],
            studiosRule:"Any",
            series: [],
            seriesRule:"Any",
            actors: [],
            actorsRule:"Any",
            tags: [],
            tagsRule:"Any"
        };
    }

    set rating(value){ this.applied.rating = value; }
    set names(value){ this.applied.names = value; }
    set studios(value){ this.applied.studios = value; }
    set studiosRule(value){ this.applied.studiosRule = value; }
    set series(value){ this.applied.series = value; }
    set seriesRule(value){ this.applied.seriesRule = value; }
    set actors(value){ this.applied.actors = value; }
    set actorsRule(value){ this.applied.actorsRule = value; }
    set tags(value){ this.applied.tags = value; }
    set tagsRule(value){ this.applied.tagsRule = value; }

    toogleTypes(value){ 
        var typeIndex = this.applied.types.indexOf(value);
        if(typeIndex === -1){
            this.applied.types.push(value);
        }else{
            this.applied.types.splice(typeIndex, 1);
        }
    }

    clear(){ 
        this.applied = this.empty;
    }

    apply(fullDB){ 
        
        var filter = this.applied;

        if( filter.names.length == 0 &&
			filter.types.length == 0 && 
			filter.rating == 0 &&
			filter.studios.length == 0 && 
			filter.series.length == 0 && 
			filter.actors.length == 0 && 
			filter.tags.length == 0 ){
			return fullDB;
		}

		var filteredList = [];
		var added;

		for(var videoDefinitionObject of fullDB){

			added = false;

			// Check for rating matches
			if(!added){
				if(videoDefinitionObject.rating == filter.rating){
					filteredList.push(videoDefinitionObject);
					added = true;
				}			
			}

			// Check for name matches
			if(!added){
				for(var name of filter.names){
					if(videoDefinitionObject.name == name || videoDefinitionObject.movieId == name){
						filteredList.push(videoDefinitionObject);
						added = true;
					}
				}
			}

			// Check for type matches
			if(!added){
				for(var type of filter.types){
					if(videoDefinitionObject.type == type){
						filteredList.push(videoDefinitionObject);
						added = true;
					}
				}
			}

			// Check for studio matches
			var studioIntersection = IntersectArrays(filter.studios, videoDefinitionObject.studios);
			if(	!added 
				&& studioIntersection.length > 0 
				&& filter.studiosRule == "Any"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}else if(!added 
				&& studioIntersection.length > 0 
				&& filter.studios.length <= studioIntersection.length 
				&& filter.studiosRule == "All"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}

			// Check for series matches
			var seriesIntersection = IntersectArrays(filter.series, videoDefinitionObject.series);
			if(	!added 
				&& seriesIntersection.length > 0 
				&& filter.seriesRule == "Any"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}else if(!added 
				&& seriesIntersection.length > 0 
				&& filter.series.length <= seriesIntersection.length 
				&& filter.seriesRule == "All"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}

			// Check for actors matches
			var actorsIntersection = IntersectArrays(filter.actors, videoDefinitionObject.actors);
			if(	!added 
				&& actorsIntersection.length > 0 
				&& filter.actorsRule == "Any"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}else if(!added 
				&& actorsIntersection.length > 0 
				&& filter.actors.length <= actorsIntersection.length 
				&& filter.actorsRule == "All"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}

			// Check for tags matches
			var tagsIntersection = IntersectArrays(filter.tags, videoDefinitionObject.tags);
			if(	!added 
				&& tagsIntersection.length > 0 
				&& filter.tagsRule == "Any"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}else if(!added 
				&& tagsIntersection.length > 0 
				&& filter.tags.length <= tagsIntersection.length 
				&& filter.tagsRule == "All"){
				filteredList.push(videoDefinitionObject);
				added = true;
			}
			
        }
        
		return filteredList;
    }
}

export default Filters;