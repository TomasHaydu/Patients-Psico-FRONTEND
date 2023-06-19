import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading } from "../users/usersSlice";
import clientAxios from "../../config/clientAxios";

const initialState = {
  patients: [],
  onePatient: {},
  alert: false,
  loading: true,
};

export const patientsReducers = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatientsList: (state, action) => {
      state.patients = action.payload.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    },
    setOnePatientsList: (state, action) => {
      state.onePatient = action.payload;
    },
    addPatients: (state, action) => {
      state.patients.push(action.payload);
    },
    setLoadingIn: (state, action) => {
      state.loading = action.payload;
    },
    editPatients: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id
      );
      state.patients.push(action.payload);
    },
    deletePatients: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload
      );
    },
    setPatientsOrder: (state, action) => {
      //Edad
      if (action.payload === "edad") {
        state.patients = state.patients.sort((a, b) => {
          return a.years - b.years;
        });
      }
      //Apellido
      else if (action.payload === "apellido") {
        state.patients = state.patients.sort((a, b) => {
          const lastNameA = a.lastName.toLowerCase();
          const lastNameB = b.lastName.toLowerCase();
          if (lastNameA < lastNameB) {
            return -1;
          }

          if (lastNameA > lastNameB) {
            return 1;
          }
          return 0;
        });
        //Nombre
      } else {
        state.patients = state.patients.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }

          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      }
    },
  },
});

export const {
  setPatientsList: setPatientsList,
  setOnePatientsList: setOnePatientsList,
  addPatients: addPatients,
  editPatients: editPatients,
  deletePatients: deletePatients,
  setLoadingIn: setLoadingIn,
  setPatientsOrder: setPatientsOrder,
} = patientsReducers.actions;

export default patientsReducers.reducer;

export const fetchAllPatients = () => async (dispatch) => {
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
    const { data } = await clientAxios.get("/patients", config);
    dispatch(setPatientsList(data));
  } catch (error) {
    console.log(error);
  }
};

export const addToAPI = (patient) => async (dispatch) => {
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
    const { data } = await clientAxios.post("/patients", patient, config);
    dispatch(addPatients(data));
    dispatch(patientsOrder());
  } catch (error) {
    console.log(error);
  }
};

export const getOnePatient = (id) => async (dispatch) => {
  dispatch(setOnePatientsList({}));
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
    const { data } = await clientAxios(`/patients/${id}`, config);
    dispatch(setOnePatientsList(data));
  } catch (error) {
    console.log(error);
  }
};

export const editToAPI = (patient) => async (dispatch) => {
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
    const { data } = await clientAxios.put(
      `/patients/${patient._id}`,
      patient,
      config
    );
    await dispatch(editPatients(data));
  } catch (error) {
    console.log(error);
  }
  dispatch(setPatientsOrder());
};

export const deleteToAPI = (id) => async (dispatch) => {
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
    const { data } = await clientAxios.delete(`/patients/${id}`, config);
    dispatch(deletePatients(id));
  } catch (error) {
    console.log(error);
  }
};

const filtrarElementos = (termOfSearch, patientsToShow) => {
  const searchResults = patientsToShow.filter((patients) => {
    const name = patients.name
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const lastName = patients.lastName
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    if (
      (name + " " + lastName).includes(
        termOfSearch
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
    ) {
      return patients;
    } else if (
      name.includes(
        termOfSearch
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
    ) {
      return patients;
    } else if (
      lastName.includes(
        termOfSearch
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
      )
    ) {
      return patients;
    } else return null;
  });
  return searchResults;
};

export const onChangeSearch = (search) => async (dispatch) => {
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
    const { data } = await clientAxios.get("/patients", config);
    dispatch(setPatientsList(filtrarElementos(search, data)));
  } catch (error) {
    console.log(error);
  }
};

export const patientsOrder = (order) => (dispatch) => {
  dispatch(setPatientsOrder(order));
};

export const insertPatientSession = (patient) => (dispatch) => {
  axios
    .put(`http://localhost:4000/posts/${patient.id}`, patient)
    .catch((error) => console.log(error));

  patient.session.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  dispatch(editPatients(patient));
};
