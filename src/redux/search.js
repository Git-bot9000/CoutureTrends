import * as ActionTypes from './ActionTypes';

export const Search = (state = {
		isLoading: false,
		errMess: null,
		searchId: null,
		productList: [],
		allProducts: [],
		numberOfPages: 0
	}, action) => {

	switch(action.type){
		case ActionTypes.SEARCH_LOADING:
			return {...state, isLoading: true}

		case ActionTypes.SEARCH_FAILED:
			return {...state, isLoading: false, errMess: action.payload, productList: [], searchId: null, numberOfPages: 0, allProducts: []}

		case ActionTypes.SEARCH_ID:
			return {...state, searchId: action.payload, productList: [], allProducts: []}

		case ActionTypes.SEARCH_SUCCESSFUL:
			return {...state, isLoading: false, errMess: null, productList: action.payload , allProducts: []}

		case ActionTypes.NUMBER_OF_PAGES:
			return {...state, numberOfPages: action.payload}

		case ActionTypes.GET_ALL_PRODUCTS:
			return {...state, allProducts: state.allProducts.concat(action.payload), isLoading: false}

		case ActionTypes.CLEAR_SEARCH_ERROR:
			return {...state, errMess: null}

		default: return state
	}

}