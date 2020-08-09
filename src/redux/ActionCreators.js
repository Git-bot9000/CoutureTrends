import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const attemptLogin = (emailId, password) => (dispatch) => {
	const loginSession = {
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
		.then(response => dispatch(loginSuccessful(emailId, response.Authorization)))
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

export const attemptSignup = (email_id, password, firstname, lastname) => (dispatch) => {
	const signupSession = {
		email_id: email_id,
		password: password,
		firstname: firstname,
		lastname: lastname
	}

	dispatch(loginLoading());

	return fetch(baseUrl + 'signup', {
		method: 'POST',
		body: JSON.stringify(signupSession),
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
		.then(response => dispatch(attemptLogin(email_id, password)))
		.catch(error => dispatch(loginFailed(error.message)));
}

export const listCollections = (authorization) => (dispatch) => {
	
	dispatch(collectionsLoading());

	return fetch(baseUrl + 'collections/list', {
		method: 'GET',
		headers: {
			'Authorization' : authorization,
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
		.then(response => dispatch(collectionsLoaded(response.list)))
		.catch(error => dispatch(collectionsFailed(error.message)));
}

export const collectionsLoading = () => ({
	type: ActionTypes.COLLECTIONS_LOADING
})

export const collectionsLoaded = (list) => ({
	type: ActionTypes.COLLECTIONS_LOADED,
	payload: list
})

export const collectionsFailed = (errMess) => ({
	type: ActionTypes.COLLECTIONS_FAILED,
	payload: errMess
})

export const newCollection = (authorization, collectionName) => (dispatch) => {
	dispatch(collectionsLoading());

	return fetch(baseUrl + 'collections/create?collection_name=' + collectionName, {
		method: 'POST',
		headers: {
			'Authorization' : authorization,
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
		.then(response => dispatch(addCollection(collectionName)))
		.catch(error => dispatch(collectionsFailed(error.message)));	
}

export const addCollection = (collectionName) => ({
	type: ActionTypes.ADD_COLLECTION,
	payload: collectionName
})

export const createSearch = (searchText, resultType, history) => (dispatch) => {
	dispatch(searchLoading());

	return fetch(baseUrl + 'search_db?text=' + searchText + '&result_type=' + resultType, {
		method: 'GET',
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
		.then(response => {
			dispatch(createSearchId(response.id));
			dispatch(numPages(response.pages));
			dispatch(searchResults(response.id, 1, history));
			for(let i=1; i<= response.pages; i++){
			dispatch(getAllProducts(response.id, i));
			}
			dispatch(getMetadata(response.id));
		})
		.catch(error => dispatch(searchFailed(error.message)));	
}

export const numPages = (pages) => ({
	type: ActionTypes.NUMBER_OF_PAGES,
	payload: pages
})

export const searchLoading = () => ({
	type: ActionTypes.SEARCH_LOADING
})

export const searchFailed = (message) => ({
	type: ActionTypes.SEARCH_FAILED,
	payload: message
})

export const createSearchId = (id) => ({
	type: ActionTypes.SEARCH_ID,
	payload: id
})

export const searchResults = (searchId, pageNo, history) => (dispatch) => {
	dispatch(searchLoading());

	return fetch(baseUrl + 'results?search_id=' + searchId + '&pageno=' + pageNo, {
		method: 'GET',
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
		.then(response => {
				dispatch(addProductList(response));
				history.push(`/search/${searchId}/${pageNo}`);
			})
		.catch(error => dispatch(searchFailed(error.message)));	
}

export const addProductList = (productList) => ({
	type: ActionTypes.SEARCH_SUCCESSFUL,
	payload: productList
})

export const clearSearchError = () => ({
	type: ActionTypes.CLEAR_SEARCH_ERROR
})

export const getMetadata = (searchId) => (dispatch) => {
	dispatch(metadataLoading());

	return fetch(baseUrl + 'results/metadata?search_id=' + searchId, {
		method: 'GET',
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
		.then(response => {
				dispatch(metadataSuccessful(response));
			})
		.catch(error => dispatch(metadataFailed(error.message)));	
}

export const metadataLoading = () => ({
	type: ActionTypes.METADATA_LOADING
})

export const metadataSuccessful = (response) => ({
	type: ActionTypes.METADATA_SUCCESSFUL,
	payload: response
})

export const metadataFailed = (error) => ({
	type: ActionTypes.METADATA_FAILED,
	payload: error
})

export const addActiveMetadata = (metadata) => ({
	type: ActionTypes.ADD_ACTIVE_METADATA,
	payload: metadata
})

export const getGraphdata = (searchId, productId, history) => (dispatch) => {
	dispatch(graphdataLoading());

	return fetch(baseUrl + 'product/similar?product_id=' + productId + '&search_id=' + searchId, {
		method: 'GET',
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
		.then(response => {
				let data = [];
				response.map((product)=>{
					let obj = {};
					obj.x = product[0];
					obj.y = product[1];
					obj.z = product[2];
					obj.pId = product[3];
					data.push(obj);
					return null;
				});
				dispatch(graphdataSuccessful(data));
			})
		.then(() => {history.push(`/similar/${searchId}/${productId}`);})
		.catch(error => dispatch(graphdataFailed(error.message)));	
}

export const graphdataLoading = () => ({
	type: ActionTypes.GRAPH_DATA_LOADING
})

export const graphdataFailed = (errMess) => ({
	type: ActionTypes.GRAPH_DATA_FAILED,
	payload: errMess
})

export const graphdataSuccessful = (data) => ({
	type: ActionTypes.GRAPH_DATA_SUCCESSFUL,
	payload: data
})

export const getAllProducts = (searchId, pageNo) => (dispatch) => {
	dispatch(searchLoading());

	return fetch(baseUrl + 'results?search_id=' + searchId + '&pageno=' + pageNo, {
		method: 'GET',
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
		.then(response => {
				dispatch(gotProducts(response));
			})
		.catch(error => dispatch(searchFailed(error.message)));	
}

export const gotProducts = (response) => ({
	type: ActionTypes.GET_ALL_PRODUCTS,
	payload: response
})