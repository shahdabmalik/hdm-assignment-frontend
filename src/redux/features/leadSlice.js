import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    leads: [],
    page: 1,
    totalPages: 0
}

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {
        SET_LEAD(state, action) {
            state.leads = action.payload
        },
        SET_PAGE(state, action) {
            state.page = action.payload
        },
        SET_TOTAL_PAGES(state, action) {
            state.totalPages = action.payload
        }
    }
});

export const { SET_LEAD, SET_PAGE, SET_TOTAL_PAGES } = leadSlice.actions

export default leadSlice.reducer