import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventData: null,
  speakerData: null,
  sponsorData: null,
  attendeesData: null,
  registrationData: null,
  speakerDataFullDetails: null,
  sponsorDataFullDetails: null,
  speakerEditData: null,
  sponsorsEditData: null,
  attendeesEditData: null,
  eventEditData: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    event(state, action) {
      state.eventData = action.payload;
    },
    eventID(state, action) {
      state.eventID = action.payload;
    },
    eventIDByQuery(state, action) {
      state.eventIDByQuery = action.payload;
    },
    speakerData(state, action) {
      state.speakerData = action.payload;
    },
    registrationData(state, action) {
      state.registrationData = action.payload;
    },
    speakerDataFullDetails(state, action) {
      state.speakerDataFullDetails = action.payload;
    },
    sponsorDataFullDetails(state, action) {
      state.sponsorDataFullDetails = action.payload;
    },
    sponsorData(state, action) {
      state.sponsorData = action.payload;
    },
    attendeesData(state, action) {
      state.attendeesData = action.payload;
    },
    speakerEditData(state, action) {
      state.speakerEditData = action.payload;
    },
    sponsorsEditData(state, action) {
      state.sponsorsEditData = action.payload;
    },
    attendeesEditData(state, action) {
      state.attendeesEditData = action.payload;
    },
    eventEditData(state, action) {
      state.eventEditData = action.payload;
    },
    deleteSpeaker:(state,action)=>{
      const speakerId = action.payload;
      state.speakerData.data = state.speakerData.data.filter(
        (speaker)=>speaker.speaker_id !== speakerId
      )
    },
    deleteSponsors:(state,action)=>{
      const sponsorId = action.payload;
      state.sponsorData.data = state.sponsorData.data.filter(
        (sponsor)=>sponsor.sponsor_id !== sponsorId
      )
    },
    deleteAttendee:(state,action)=>{
      const attendeeId = action.payload;
      state.attendeesData.data = state.attendeesData.data.filter(
        (attendee)=>attendee.attendee_id !== attendeeId
      )
    },
    deleteEventData:(state,action)=>{
      const E_id = action.payload;
      state.eventData.data = state.eventData.data.filter(
        (del)=>del.event_id !== E_id
      )
    }
  },
});

export const {
  event,
  eventID,
  eventIDByQuery,
  speakerData,
  registrationData,
  speakerDataFullDetails,
  sponsorDataFullDetails,
  sponsorData,
  attendeesData,
  speakerEditData,
  sponsorsEditData,
  attendeesEditData,
  eventEditData,
  deleteSpeaker,
  deleteSponsors,
  deleteAttendee,
  deleteEventData
} = eventSlice.actions;

export default eventSlice.reducer;
