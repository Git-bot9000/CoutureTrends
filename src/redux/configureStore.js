import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Login } from './login';
import { Collections } from './collections';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['login', 'collections']
}

export const store = createStore(
		persistReducer(persistConfig,combineReducers({
			login: Login,
			collections: Collections
		})),
		applyMiddleware(thunk, logger)
	);
	
export const persistor = persistStore(store);