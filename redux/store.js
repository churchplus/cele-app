import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import notificationSlice from './notificationSlice';

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage: AsyncStorage,
// };

const rootReducer = combineReducers({
    user: userSlice,
    notification: notificationSlice
});
// const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: rootReducer,
});