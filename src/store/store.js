import { configureStore } from "@reduxjs/toolkit";
import MeetingSlice from './meetingSlice';

const store = configureStore({
    reducer: {
        meetings: MeetingSlice
    }
})

export default store;