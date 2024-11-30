import { createSlice } from "@reduxjs/toolkit";

const MeetingSlice = createSlice({
    name: 'MeetingSlice',
    initialState: {
        meetings: [],
        currentMeeting: null,
        isEdit: false,
    },
    reducers: {
        setMeeting: (state, action) => {
            const newMeeting = { ...action.payload, id: Date.now() };
            state.meetings = [...state.meetings, newMeeting];
        },
        updateMeeting: (state, action) => {
            const index = state.meetings.findIndex(meeting => meeting.id === action.payload.id);
            if (index !== -1) {
                state.meetings[index] = action.payload;
            }
        },
        deleteMeeting: (state, action) => {
            state.meetings = state.meetings.filter(meeting => meeting.startTime !== action.payload);
        },
        setEditMeeting: (state, action) => {
            state.currentMeeting = action.payload;
            state.isEdit = true;
        },
        resetEditMeeting: (state) => {
            state.isEdit = false;
            state.currentMeeting = null;
        },

    }
});

export const { setMeeting, updateMeeting, deleteMeeting, setEditMeeting, resetEditMeeting } = MeetingSlice.actions;

export default MeetingSlice.reducer;