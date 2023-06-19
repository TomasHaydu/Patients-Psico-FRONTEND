import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserAlert from "../components/UserAlert";
import ShowPassword from "../img/see-password.svg";
import axios from "axios";
import clienteAxios from "../../../../../12-UpTask_MERN/frontend/src/config/clienteAxios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [name, email, email2, password].map((value) => value.trim()).includes("")
    ) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (email !== email2) {
      setAlert({
        msg: "Los emails deben ser iguales",
        error: true,
      });
      return;
    }
    if (email.length < 10) {
      setAlert({
        msg: "Email incorrecto",
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

    setAlert({});

    try{
      const {data} = await clienteAxios.post(`/users`, {name, email, password})
      setName("")
      setEmail("")
      setEmail2("")
      setPassword("")
      setAlert({msg: data.msg,
      error: false})
    }catch(error){
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }

  };

  return (
    <div className="absolute bg-slate-50 top-28 md:top-16 rounded-lg w-5/6 md:w-3/5">
      <div className="m-4 flex flex-col justify-end">
        <div className="flex flex-wrap justify-center">
          <h2 className="text-4xl text-center login text-slate-600">
            Crea tu cuenta y Administra tus
            <span className="text-4xl login text-orange-400 ml-2">
              Pacientes
            </span>
          </h2>
        </div>
        <form
          className="flex flex-col my-2 uppercase font-mono gap-1"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="" className=" md:w-2/5 text-center font-bold">
              Nombre y Apellido
            </label>
            <input
              type="text"
              className="border-2 rounded-lg bg-slate-100 hover:bg-slate-50 w-3/5 p-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="" className="w-2/5 text-center font-bold">
              Email
            </label>
            <input
              type="email"
              className="border-2 rounded-lg bg-slate-100 hover:bg-slate-50 w-3/5 p-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="" className="w-2/5 text-center font-bold">
              Repetir Email
            </label>
            <input
              type="email"
              className="border-2 rounded-lg bg-slate-100 hover:bg-slate-50 w-3/5 p-1"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
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
              <div className="w-4 flex items-center justify-end mx-4 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}>
                <img src={ShowPassword} alt="" className={showPassword ? " w-4 cursor-pointer bg-slate-300 rounded-full" :  "cursor-pointer"} />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="border-2 rounded-lg p-2 bg-orange-300 hover:bg-orange-400 text-white w-4/6 mt-2">
              Crear Usuario
            </button>
          </div>
        </form>
        <div className="flex justify-between font-mono text-slate-400 mx-1 md:mx-2">
          <Link to="/forget-password">Olvide Contaseña</Link>
          <Link to="/">¿Ya tienes cuenta?</Link>
        </div>
      </div>
      {alert.msg && <UserAlert alert={alert} />}
    </div>
  );
};

export default Register;
