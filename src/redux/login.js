import * as ActionTypes from './ActionTypes';

export const Login = (state = {
		isLoading: false,
		errMess: null,
		email: null,
		isLoggedIn: false,
		authorization: null
	},action) => {
	switch(action.type){
		case ActionTypes.LOGIN_LOADING:
			return {...state, isLoading: true}

		case ActionTypes.LOGIN_SUCCESSFUL:
			return {...state, isLoading: false, errMess: null, isLoggedIn: true, email: action.payload.email, 
				authorization: action.payload.authorization}

		case ActionTypes.LOGIN_FAILED:
			return{...state, isLoading: false, errMess: action.payload, email: null, isLoggedIn: false, 
				authorization: null}

		case ActionTypes.LOGOUT:
			return{...state, isLoading: false, errMess: null, email: null, isLoggedIn: false, 
				authorization: null}

		default: return state
	}
}