import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAction(state, action) {
      return action.payload.toLowerCase();
    },
  },
});

export const { filterAction } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
