import * as ActionTypes from './ActionTypes';

export const Metadata = (state={
		isLoading: false,
		errMess: null,
		filters: [],
		tags: [],
		activeMetadata: []
	}, action) => {

	switch(action.type){

		case ActionTypes.METADATA_LOADING:
			return {...state, isLoading: true}

		case ActionTypes.METADATA_FAILED:
			return {...state, isLoading: false, errMess: action.payload, filters: [], tags: [], activeMetadata: []}

		case ActionTypes.METADATA_SUCCESSFUL:
			return {...state, isLoading: false, errMess: null, filters: action.payload.filter, tags: action.payload.tags, activeMetadata: []}

		case ActionTypes.ADD_ACTIVE_METADATA:
			let variable = action.payload;
			return{...state, activeMetadata: state.activeMetadata.concat(variable)};

		default: return state
	}

}