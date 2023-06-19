import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import UserAlert from "../components/UserAlert";
import ShowPassword from "../img/see-password.svg";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState(false);

  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState(false);
  const params = useParams();

  const [showPassword, setShowPassword] = useState(false)

  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await clientAxios(`/users/forget-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const handleSubmite = async (e) => {
    e.preventDefault();

    if (password.trim().length === 0) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "El password debe ser mayor a 6 caracteres",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/forget-password/${token}`;

      const { data } = await clientAxios.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setNewPassword(true);
      setPassword("")
      Navigate("/")
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <div className="absolute bg-slate-50 top-28 md:top-16 rounded-lg w-5/6 md:w-3/5">
      <div className="m-4">
        <div className="flex flex-wrap justify-center">
          <h2 className="text-4xl login text-slate-600 mx-2 text-center">
            Pon tu nueva contraseña y continua administrando tus
            <span className="text-4xl login text-orange-400 ml-2">
              Pacientes
            </span>
          </h2>
        </div>
        {validToken && (
          <form
            className="flex flex-col my-4 uppercase font-mono gap-2"
            onSubmit={(e) => handleSubmite(e)}
          >
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="" className="w-2/5 text-center font-bold">
              Nueva Contraseña
            </label>
            <div className="border-2 rounded-lg bg-slate-100 hover:bg-slate-50 w-3/5 flex flex-row justify-between">
              <input
                type={showPassword ? "text" : "password"}
                className="bg-slate-100 hover:bg-slate-50 border-0 p-1 w-11/12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="w-4 flex items-center justify-end mx-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
                <img src={ShowPassword} alt="" className={showPassword ? " w-4 cursor-pointer bg-slate-300 rounded-full" :  "cursor-pointer"} />
              </div>
            </div>
          </div>
            <div className="flex justify-center">
              <button className="border-2 rounded-lg p-2 bg-orange-300 hover:bg-orange-400 text-white w-4/6 mt-2">
                Guardar Contraseña
              </button>
            </div>
          </form>
        )}
        {newPassword && (
          <div className="flex justify-center font-mono text-slate-400 mx-2 mt-16">
            <Link to="/">Iniciar Sesion</Link>
          </div>
        )}
      </div>
      {alert.msg && <UserAlert alert={alert} />}
    </div>
  );
};

export default NewPassword;
