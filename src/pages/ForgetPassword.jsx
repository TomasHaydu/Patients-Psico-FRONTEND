import React, { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import UserAlert from "../components/UserAlert";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmite = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "El Email es obligatorio",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post(`/users/forget-password`, {
        email,
      });

      setAlert({
        msg: data.msg,
        error: false,
      });
      setEmail("");
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <div className="absolute bg-slate-50 top-28 md:top-16 rounded-lg w-5/6 md:w-3/5">
      <div className="m-4 flex flex-col justify-end">
        <div className="flex flex-wrap justify-center">
          <h2 className="text-4xl login text-slate-600 mx-2 text-center">
            Recupera tu contraseña y continua administrando tus
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
          <div className="flex justify-center">
            <button className="border-2 rounded-lg p-2 bg-orange-300 hover:bg-orange-400 text-white w-4/6 mt-2">
              Recuperar Contraseña
            </button>
          </div>
        </form>
        <div className="flex justify-between font-mono text-slate-400 mt-14 mx-2">
          <Link to="/">¿Ya tienes cuenta?</Link>
          <Link to="/register">Crear Usuario</Link>
        </div>
      </div>
      {alert.msg && <UserAlert alert={alert} />}
    </div>
  );
};

export default ForgetPassword;
