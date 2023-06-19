import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowPassword from "../img/see-password.svg";
import UserAlert from "../components/UserAlert";
import clientAxios from "../config/clientAxios";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  changeLoading,
  deleteUser,
} from "../features/users/usersSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const auth = useSelector((state) => state.users.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmite = async (e) => {
    e.preventDefault();

    if ([email, password].map((value) => value.trim()).includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });
      setAlert({});
      localStorage.setItem("token", data.token);
      dispatch(addUser(data));
      navigate("/patients");
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });

      dispatch(deleteUser);
    }
  };

  return (
    <div className="absolute bg-slate-50 top-28 md:top-16 rounded-lg w-5/6 md:w-3/5">
      <div className="m-4 flex flex-col justify-end">
        <div className="flex flex-wrap justify-center">
          <h2 className="text-4xl login text-center text-slate-600">
            Inicia Sesión y Administra tus
            <span className="text-4xl login text-orange-400 ml-2">
              Pacientes
            </span>
          </h2>
        </div>
        <form
          className="flex flex-col my-4 uppercase font-mono gap-2"
          onSubmit={(e) => handleSubmite(e)}
        >
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="" className="w-2/5 text-center font-bold">
              Email
            </label>
            <input
              type="email"
              className="border-2 rounded-lg bg-slate-100 hover:bg-slate-50 w-3/5 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="" className="w-2/5 text-center font-bold">
              Contraseña
            </label>
            <div className="border-2 rounded-lg bg-slate-100 hover:bg-slate-50 w-3/5 flex flex-row justify-between">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-slate-100 hover:bg-slate-50 border-0 p-1 w-11/12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="w-4 flex items-center justify-end mx-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={ShowPassword}
                  alt=""
                  className={
                    showPassword
                      ? " w-4 cursor-pointer bg-slate-300 rounded-full"
                      : "cursor-pointer"
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="border-2 rounded-lg p-2 bg-orange-300 hover:bg-orange-400 text-white w-4/6 mt-2">
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="flex justify-between font-mono text-slate-400 mx-2">
          <Link to="/forget-password">Olvide Contaseña</Link>
          <Link to="/register">Crear Usuario</Link>
        </div>
      </div>
      {alert.msg && <UserAlert alert={alert} />}
    </div>
  );
};

export default Login;
