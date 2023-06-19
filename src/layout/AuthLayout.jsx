import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { addUser, changeLoading } from "../features/users/usersSlice";
import clientAxios from "../config/clientAxios";

const AuthLayout = () => {

  const loading = useSelector((state) => state.users.loading);


  return (
    <>
        <div>
          <div className="z-10">
            <div className="row-1 row"></div>
            <div className="row-2 row"></div>
            <div className="row-3 row"></div>
            <div className="row-4 row"></div>
            <div className="row-5 row"></div>
            <div className="row-6 row"></div>
            <div className="row-7 row"></div>
            <div className="row-8 row"></div>
            <div className="row-9 row"></div>
            <div className="row-10 row"></div>
          </div>
          <div className="flex justify-center items-center">
            <Outlet />
          </div>
        </div>
    </>
  );
};

export default AuthLayout;
