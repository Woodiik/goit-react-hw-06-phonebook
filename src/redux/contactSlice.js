import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
export const INITIAL_CONTACTS = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const savedContacts = JSON.parse(localStorage.getItem('contacts'));
const contactSlice = createSlice({
  name: 'contacts',
  initialState: savedContacts ?? INITIAL_CONTACTS,
  reducers: {
    addContactAction: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(name, number) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    removeContactAction: {
      reducer(state, action) {
        return state.filter(item => item.id !== action.payload);
      },
    },
  },
});

export const { addContactAction, removeContactAction } = contactSlice.actions;
export const contactsReducer = contactSlice.reducer;
