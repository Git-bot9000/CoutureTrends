import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const attemptLogin = (emailId, password) => (dispatch) => {
	const loginSession={
		email_id: emailId,
		password: password
	}

	dispatch(loginLoading());

	return fetch(baseUrl + 'login', {
		method: 'POST',
		body: JSON.stringify(loginSession),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin'
	})
		.then(response=>{
			if(response.ok){
				return response;
			}
			else{
				let error = new Error('Error' + response.status + ': ' + response.message)
				error.response = response;
				throw error;
			}
		},
		error => {
			let errmess = new Error(error.message);
			throw errmess;
		})
		.then(response => response.json())
		.then(response => dispatch(loginSuccessful(emailId, response.authorization)))
		.catch(error => dispatch(loginFailed(error.message)));
}

export const loginLoading = () => ({
	type: ActionTypes.LOGIN_LOADING
})

export const loginSuccessful = (email, authorization) => ({
	type: ActionTypes.LOGIN_SUCCESSFUL,
	payload: {
		email: email,
		authorization: authorization
	}
})

export const loginFailed = (errMess) => ({
	type: ActionTypes.LOGIN_FAILED,
	payload: errMess
})

export const logout = () => ({
	type: ActionTypes.LOGOUT
})