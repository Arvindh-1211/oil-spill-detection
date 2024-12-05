import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import locationReducer from './locationSlice'

const persistConfig = {
	key: "root",
	version: 1,
	storage,
}

const reducers = combineReducers({
	location: locationReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

const persistor = persistStore(store);

export { store, persistor }