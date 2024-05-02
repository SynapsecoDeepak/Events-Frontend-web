// authSlice.js
 
import { createSlice } from '@reduxjs/toolkit';
import {attendeesData, event, eventID, speakerData, speakerDataFullDetails, sponsorData, sponsorDataFullDetails} from "./eventSlice"
 
const initialState = {
  isAuthenticated: false,
  user: null,
};
 
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
 
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;


export const logoutAndResetEvent = ()=>{
  return (dispatch) =>{
    dispatch(logout());
    dispatch(event(null))
    dispatch(eventID(null))
    dispatch(speakerData(null))
    dispatch(sponsorData(null))
    dispatch(attendeesData(null))
    dispatch(speakerDataFullDetails(null))
    dispatch(sponsorDataFullDetails(null))
  }

}