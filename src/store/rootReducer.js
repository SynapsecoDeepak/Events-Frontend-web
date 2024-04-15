const { combineReducers } = require("@reduxjs/toolkit");
import authReducer from '../store/slice/authSlice';
import eventReducer from '../store/slice/eventSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    event:eventReducer,

})

export default rootReducer;