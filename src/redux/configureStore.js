import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Login } from './login';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['login']
}

export const store = createStore(
		persistReducer(persistConfig,combineReducers({
			login: Login
		})),
		applyMiddleware(thunk, logger)
	);
	
export const persistor = persistStore(store);