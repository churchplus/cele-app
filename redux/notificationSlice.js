import { createSlice } from '@reduxjs/toolkit';

// This is the initial state of the slice
const initialState = {
    newNotification: false,
    messages: [],
    isSocialsNotification: false
};

export const userSlice = createSlice({
    name: 'notification', // This is the name of the slice, we will later use this name to access the slice from the store
    initialState: initialState, // This is the initial state of the slice
    reducers: {
        // All the reducers go here
        updateNewNoticationStatus: (state, { payload }) => {
            state.newNotification = payload;
        },
        updateNotificationMessages: (state, { payload }) => {
            state.messages.push(payload)
        },
        clearNotificationMessages: (state) => {
            state.messages = new Array()
        },
        setIsSocialNotifications: (state, { payload }) => {
            state.isSocialsNotification = payload
        }
    },
});

export const { 
    updateNewNoticationStatus,
    updateNotificationMessages,
    clearNotificationMessages,
    setIsSocialNotifications
} = userSlice.actions;

export default userSlice.reducer;