import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        lat: 0,
        lng: 0
    },
    reducers: {
        setLocation : (state, action) => {
            state.lat = action.payload.lat
            state.lng = action.payload.lng
        }
    }
})

export const {setLocation} = locationSlice.actions

export default locationSlice.reducer;