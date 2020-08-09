import * as ActionTypes from './ActionTypes';

export const Graphdata = (state ={
		isLoading: false,
		errMess: null,
		data: []
	}, action) => {

	switch(action.type){

		case ActionTypes.GRAPH_DATA_LOADING:
			return {...state, isLoading: true}

		case ActionTypes.GRAPH_DATA_FAILED:
			return {...state, isLoading: false, errMess: action.payload, data: []}

		case ActionTypes.GRAPH_DATA_SUCCESSFUL:
			return {...state, isLoading: false, errMess: null, data: action.payload}

		default: return state
	}
}