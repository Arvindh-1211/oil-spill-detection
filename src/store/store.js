import { configureStore, combineReducers } from '@reduxjs/toolkit';

import locationReducer from './locationSlice';

const reducers = combineReducers({
  location: locationReducer,
});

const store = configureStore({
  reducer: reducers,
});

export { store };