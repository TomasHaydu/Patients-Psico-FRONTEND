/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Outlet,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "../img/home.png";
import Add from "../img/add-btn.svg";
import Back from "../img/back-btn.svg";
import User from "../img/user-btn.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPatients } from "../features/patient/patientsSlice";
import { addUser } from "../features/users/usersSlice";

const layout = () => {

  const [userMenu, setUserMenu] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllPatients());
  }, []);

  const deleteToken = () => {
    confirm("Desea cerrar sesion?");

    if (confirm) {
      localStorage.removeItem("token");
      dispatch(addUser({}));
      navigate("/");
    }
  };

  const changePassword = () => {
    confirm("Desea cambiar su contraseña?");

    if (confirm) {
      localStorage.removeItem("token");
      dispatch(addUser({}));
      navigate("/forget-password");
    }
  };

  const auth = useSelector((state) => state.users.auth);

  return (
    <div className="h-screen md:h-full">
      <div className="h-full">
        <div className="bg-gradient-to-b from-orange-100 to-orange-200 border-b-4 border-orange-200 w-full md:w-full h-1/6 md:h-16 flex justify-between items-center rounded-b-lg shadow-md">
          <p className="md:mx-14 mx-4 w-10 text-center font-extrabold border-2 p-2 rounded-full text-slate-700 border-slate-700 ">
            P
          </p>
          <div className="text-center flex items-center mx-10 gap-8">
            <p className="font-mono">
              Bienvenido/a <span className="font-bold">{auth.name}</span>
            </p>
            <button onClick={() => setUserMenu(!userMenu)}>
              <img
                src={User}
                alt=""
                className="w-16 md:w-8 hover:bg-orange-300 rounded-full hover:hover:shadow-md"
              />
            </button>
            {userMenu && (
              <div className="absolute w-full md:w-auto h-1/4 md:h-auto top-1/4 bottom-1/4 md:top-16 md:bottom-auto right-2 bg-white border-2 border-slate-100 p-6 rounded-lg animTop">
                <div className="flex flex-col text-sm gap-2 font-mono">
                  <button onClick={() => changePassword()}>Cambiar Contraseña</button>
                  <div className="h-0.5 w-full bg-slate-100"></div>
                  <button onClick={() => deleteToken()}>Cerrar Sesión</button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between md:flex-row-reverse bg-neutral-100 h-5/6 md:h-screen w-full">
          <div className="bg-neutral-50 md:w-10/12 w-full md:h-5/6 h-4/5 md:mx-8 md:my-8 rounded-lg shadow-md">
            <Outlet />
          </div>
          <div className="bg-gradient-to-b from-orange-100 to-orange-200 h-1/5 shadow-2xl md:w-28 md:ml-4 md:my-10 w-full md:h-3/4 flex md:flex-col items-center justify-around md:rounded-full p-4">
            <Link className="flex justify-center items-center" to="/patients">
              <img
                className="hover:bg-orange-200 hover:shadow-md rounded-2xl cursor-pointer p-0.5"
                src={Home}
              ></img>
            </Link>
            <Link className="ml-2" to="/patients/new">
              <img
                className="hover:bg-orange-200 hover:shadow-md rounded-2xl w-14 p-2 cursor-pointer"
                src={Add}
              ></img>
            </Link>

            <button className="ml-2" onClick={() => window.history.back()}>
              <img
                className="hover:bg-orange-200 hover:shadow-md rounded-2xl w-14 p-2 cursor-pointer"
                src={Back}
              ></img>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
