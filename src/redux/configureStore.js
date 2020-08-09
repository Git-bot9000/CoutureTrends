import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Login } from './login';
import { Collections } from './collections';
import { Search } from './search';
import { Metadata } from './metadata';
import { Graphdata } from './graphdata';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['login', 'collections', 'search', 'metadata', 'graphdata']
}

export const store = createStore(
		persistReducer(persistConfig,combineReducers({
			login: Login,
			collections: Collections,
			search: Search,
			metadata: Metadata,
			graphdata: Graphdata
		})),
		applyMiddleware(thunk, logger)
	);
	
export const persistor = persistStore(store);