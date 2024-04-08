
 
import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  eventData: null,
  speakerData: null,
  sponsorData:null,
  attendeesData:null,
};
 
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    event(state, action) {
        state.eventData = action.payload;
      },
      speakerData(state, action) {
        state.speakerData = action.payload;
      },
      sponsorData(state, action) {
        state.sponsorData = action.payload;
      },
      attendeesData(state, action) {
        state.attendeesData = action.payload;
      },
  },
});

export const { event , speakerData,sponsorData,attendeesData} = eventSlice.actions;

 
export default eventSlice.reducer;