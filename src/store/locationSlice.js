import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        lat: 0,
        lng: 0,
        nearbyShips: []
    },
    reducers: {
        setLocation : (state, action) => {
            state.lat = action.payload.lat
            state.lng = action.payload.lng
        },
        setNearbyShips: (state, action) => {
            state.nearbyShips = action.payload
        }
    }
})

export const { setLocation, setNearbyShips } = locationSlice.actions

export default locationSlice.reducer
