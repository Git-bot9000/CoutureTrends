import * as ActionTypes from './ActionTypes';

export const Collections = (state = {
		isLoading: false,
		errMess: null,
		list: []
	}, action) => {

	switch(action.type){
		case ActionTypes.COLLECTIONS_LOADING:
			return {...state, isLoading: true}

		case ActionTypes.COLLECTIONS_LOADED:
			return {...state, isLoading: false, errMess: null, list: action.payload}

		case ActionTypes.COLLECTIONS_FAILED:
			return {...state, isLoading: false, errMess: action.payload}

		case ActionTypes.ADD_COLLECTION:
			return {...state, isLoading: false, errMess: null, list: state.list.concat({
				collection_name: action.payload,
				collection_item_list: []
			})}

		default: return state
	}

}