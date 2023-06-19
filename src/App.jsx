import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectLayout from "./layout/ProtectLayout";
import Home from "./pages/Home";
import EditPatient from "./pages/EditPatient";
import NewPatient from "./pages/NewPatient";
import InfoPatient from "./pages/InfoPatient";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import Sessions from "./pages/Sessions";
import { useDispatch, useSelector } from "react-redux";
import { addUser, changeLoading } from "./features/users/usersSlice";
import clientAxios from "./config/clientAxios";

function App() {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.users.auth)

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(changeLoading(false));
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clientAxios("/users/profile", config);
        dispatch(addUser(data));
      } catch (error) {     
        dispatch(addUser({}));
      }
      dispatch(changeLoading(false));
    };
    authUser();

  }, [])
  
    



  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated.name ? <Navigate to="/patients" /> : <AuthLayout />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="forget-password/:token" element={<NewPassword />} />
          <Route path="confirm/:id" element={<ConfirmAccount />} />
        </Route>
        
        <Route path="/patients" element={!isAuthenticated.name ? <Navigate to="/" /> : <ProtectLayout />}>
          <Route index element={<Home/>} />
          <Route path="edit/:id" element={<EditPatient />} />
          <Route path="new" element={<NewPatient />} />
          <Route path=":id" element={<InfoPatient />} />
          <Route path="sessions/:id" element={<Sessions/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
