import { configureStore, combineReducers } from "@reduxjs/toolkit";
import patientsReducers from "../features/patient/patientsSlice";
import usersReducers from "../features/users/usersSlice";
import sessionsReducers from "../features/sessions/sessionsSlice";

const rootReducer = combineReducers({
  patients: patientsReducers,
  users: usersReducers,
  sessions: sessionsReducers
});

export const store = configureStore({
  reducer: rootReducer,
});
