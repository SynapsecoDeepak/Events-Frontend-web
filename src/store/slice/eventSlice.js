
 
import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
  eventData: null,
  speakerData: null,
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
  },
});

export const { event , speakerData} = eventSlice.actions;

 
export default eventSlice.reducer;