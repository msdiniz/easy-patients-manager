
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = {

  selectedPatient: null,

  patients: [],

  isEditing: false,

  isAdding: false,

};

const patientSlice = createSlice({

  name: 'patient',

  initialState,

  reducers: {

    setSelectedPatient(state, action) {

      state.selectedPatient = action.payload;

    },

    setPatients(state, action) {

      state.patients = action.payload;

    },

    setIsEditing(state, action) {

      state.isEditing = action.payload;

    },

    setIsAdding(state, action) {

      state.isAdding = action.payload;

    },

  },

});

export const { setSelectedPatient, setPatients, setIsEditing, setIsAdding } = patientSlice.actions;

const store = configureStore({

  reducer: patientSlice.reducer,

});


export default store;
