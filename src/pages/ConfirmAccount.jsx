import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import UserAlert from "../components/UserAlert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmedAccount, setConfirmedAccount] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confrimAccount = async () => {
      try {
        const url = `/users/confirm/${id}`;
        const { data } = await clientAxios(url);

        console.log(data);
        setAlert({
          msg: data.msg,
          error: false,
        });

        setConfirmedAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    return () => confrimAccount();
  }, []);

  return (
    <div className="absolute bg-slate-50 top-28 md:top-16 rounded-lg w-5/6 md:w-3/5">
      <div className="m-4 flex flex-col justify-end">
        <div className="flex flex-wrap justify-center">
          <h2 className="text-4xl login text-center text-slate-600">
            Confirma tu cuenta y Comienza a Administra tus
            <span className="text-4xl login text-orange-400 ml-2">
              Pacientes
            </span>
          </h2>
        </div>
        {confirmedAccount && (
          <div className="flex justify-center font-mono text-slate-400 mx-2 mt-16">
            <Link to="/">Iniciar Sesion</Link>
          </div>
        )}
      </div>
      {alert.msg && <UserAlert alert={alert} />}
    </div>
  );
};

export default ConfirmAccount;
