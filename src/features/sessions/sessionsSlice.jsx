import { createSlice } from "@reduxjs/toolkit";
import clientAxios from "../../config/clientAxios";
import { setLoadingIn } from "../patient/patientsSlice";

const initialState = {
  sessions: [],
  loading: true,
};

export const sessionsReducers = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setSessions: (state, action) => {
      if (action.payload === 0 || action.payload === undefined) {
        state.sessions = [];
      } else {
        state.sessions = [...action.payload].sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    },
    
    pushSessions: (state, action) => {
      state.sessions.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    editSession: (state, action) => {
      state.sessions = state.sessions.filter(
        (session) => session.id !== action.payload.id
      );
      state.sessions.push(action.payload);
    },
    deleteSession: (state, action) => {
      state.sessions = state.sessions.filter(
        (session) => session._id !== action.payload
      );
    },
    setSessionsList: (state, action) => {
      if (action.payload === "payment") {
        state.sessions.sort((a, b) => {
          return a.payment === b.payment ? 0 : a.payment ? 1 : -1;
        });
      } else {
        state.sessions.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
      }
    },
  },
});

export const {
  setSessions: setSessions,
  setLoading: setLoading,
  pushSessions: pushSessions,
  setSessionsList: setSessionsList,
  deleteSession: deleteSession,
  editSession: editSession,
} = sessionsReducers.actions;

export default sessionsReducers.reducer;

export const moveSessions = (listSessions) => async (dispatch) => {
  await dispatch(setSessions([]));
  await dispatch(setSessions(listSessions));
  await dispatch(setSessionsList());
};

export const addSession = (session) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clientAxios.post("/sessions", session, config);
    dispatch(pushSessions(data));
    dispatch(orderSessions())
  } catch (error) {
    console.log(error);
  }
};

export const editAPISession = (session) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setLoadingIn(false));
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const {data} = await clientAxios.put(`/sessions/${patient._id}`, session, config)
    await dispatch(editSession(data))
  } catch (error) {
    console.log(error)
  }
  dispatch(setPatientsOrder())
};

export const deleteAPISessions = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await clientAxios.delete(`/sessions/${id}`, config)
    dispatch(deleteSession(id));
  } catch (error) {
    console.log(error);
  }
};

export const changeLoading = (boolean) => async (dispatch) => {
  dispatch(setLoading(boolean));
};

export const orderSessions = (value) => (dispatch) => {
  dispatch(setSessionsList(value))
}
