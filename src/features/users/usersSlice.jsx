import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import clientAxios from "../../config/clientAxios";

const initialState = {
  auth: {},
  loading: true,
};

export const usersReducers = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.auth = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    editPatients: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload.id
      );
      state.patients.push(action.payload);
    },
    deletePatients: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.id !== action.payload.id
      );
    },
  },
});

export const { setUser: setUser, setLoading: setLoading } = usersReducers.actions;

export default usersReducers.reducer;

export const addUser = (data) => (dispatch) => {
  try {
    dispatch(setUser(data));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = () => (dispatch) => {
  try {
    dispatch(setUser({}));
  } catch (error) {
    console.log(error);
  }
};

export const changeLoading = (boolean) => async (dispatch) => {
  dispatch(setLoading(boolean)) 
};
