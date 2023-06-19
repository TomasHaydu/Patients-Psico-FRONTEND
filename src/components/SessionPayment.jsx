/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addSession,
  deleteAPISessions,
  editAPISession,
  moveSessions,
  orderSessions,
} from "../features/sessions/sessionsSlice";

import NoPaid from "../img/error.svg";
import Paid from "../img/good.svg";
import Edit from "../img/edit-btn.svg";
import Delete from "../img/delete-btn.svg";

import sessionsIndex from "../img/sessions-index.svg";
import { getOnePatient } from "../features/patient/patientsSlice";

const SessionPayment = ({}) => {
  const dispatch = useDispatch();

  const [date, setDate] = useState("");
  const [payment, setPayment] = useState("");
  const [paid, setPaid] = useState(false);
  const [idSession, setIdSession] = useState(false);

  const [edit, setEdit] = useState(false);

  const patient = useSelector((state) => state.patients.onePatient);

  const sessions = useSelector((state) => state.sessions.sessions);
  

  const newSession = () => {
    let thisSession = {
      date,
      paid,
      payment,
      patient: patient._id,
    };
    dispatch(addSession(thisSession));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (edit) {
      let thisSession = {
        date,
        paid,
        payment,
        idSession,
      };

      dispatch(editAPISession(thisSession));

      setEdit(false);
    } else {
      newSession();
    }

    setDate("");
    setPaid(false);
    setPayment("");
  };

  const handleEdit = (session) => {
    setEdit(true);

    setDate(session.date.slice(0, 10));
    setPaid(session.paid);
    setPayment(session.payment);
    setIdSession(session._id);
  };

  const handleDelete = (id) => {
    const response = window.confirm("¿Desea ELIMINAR esta sesion?");

    if (response) {
      dispatch(deleteAPISessions(id));
    }
  };

  const handleSelect = (value) => {
    dispatch(orderSessions(value));
  };

  const formatDate = (dateString) => {
    // Remove unwanted characters
    const date = dateString.slice(0, 10);

    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);

    const finalDate = `${day}-${month}-${year}`;

    return finalDate;
  };

  return (
    <div className="bg-neutral-50 flex flex-col items-center w-full md:mr-4 rounded-lg">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col md:flex-row items-center md:items-end justify-between mx-2 md:mx-8 my-4 text-lg w-full md:w-11/12 gap-2 shadow-xl p-2 rounded-lg"
      >
        <div className="flex flex-col items-center w-1/3">
          <label className="font-bold">Fecha de la sesion:</label>
          <input
            type="date"
            required
            className="hover:bg-slate-100 p-0.5 my-1 border-2 w-full border-zinc-300 rounded-xl shadow-md"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-bold">Abonó?</label>
          <input
            type="checkbox"
            className="hover:bg-slate-100 w-7 h-7 my-2 border-2 border-zinc-300 shadow-md"
            checked={paid}
            onChange={(e) => {
              setPaid(!paid);
            }}
          />
        </div>
        <div className="flex flex-col items-center w-1/3">
          <label className="font-bold">Medio:</label>
          <input
            type="text"
            className="hover:bg-slate-100 w-full my-1 border-2 p-1 border-zinc-300 rounded-xl shadow-md"
            onChange={(e) => setPayment(e.target.value)}
            value={!paid ? "" : payment}
            maxLength={18}
            disabled={paid ? false : true}
          />
        </div>
        <input
          type="submit"
          className={
            edit
              ? "bg-gradient-to-b from-blue-100 to-blue-200 shadow-md border-2 border-blue-100 hover:border-blue-300 p-1 my-1 rounded-lg w-1/6 cursor-pointer"
              : "bg-gradient-to-b from-green-200 to-green-300 shadow-md border-2 border-green-200 hover:border-green-400 p-1 my-1 rounded-lg w-1/6 cursor-pointer"
          }
          value={edit ? "Editar" : "Añadir"}
        />
      </form>
      <div className="mx-8 flex flex-col md:inline-block md:w-11/12 border-t-2 border-slate-200">
        <div className="flex md:flex-row flex-col justify-between my-4 items-center">
          <label className="font-bold text-lg">Historial de Sesiones:</label>
          <div>
            <select
              className="w-full md:w-9/12 p-3 rounded-lg text-xs shadow-md"
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="" disabled>
                -Ordernar por-
              </option>
              <option value="date">Fecha</option>
              <option value="payment">Pagado</option>
            </select>
          </div>
        </div>

        <div className="md:mb-2 block bg-slate-50 rounded-md p-4 w-full max-h-48 md:max-h-64 md:overflow-y-auto">
          {sessions[0] ? (
            sessions.map((s) => (
              <div
                className="grid grid-rows-2 md:flex justify-between w-full my-2 rounded-md border-gray-200 border-b-2 hover:bg-slate-100 hover:shadow-md"
                key={s._id}
              >
                <ul className="flex justify-start items-start md:items-center mx-0 md:mx-2">
                  <img src={sessionsIndex} alt="" className="w-4" />
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="mx-2 underline font-bold">Fecha:</label>
                    <li className="">{formatDate(s.date)}</li>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="mx-2 underline font-bold">Abonó:</label>
                    <li
                      className={
                        s.paid === true
                          ? "bg-green-200 rounded-md my-1 flex p-1 w-14 md:w-12"
                          : "bg-red-400 rounded-md my-1 flex p-1 w-14 md:w-12"
                      }
                    >
                      <img
                        src={s.paid === true ? Paid : NoPaid}
                        alt=""
                        className="w-5"
                      />
                      {s.paid === true ? "Si" : "No"}
                    </li>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center">
                    <label className="mx-2 underline font-bold">
                      Por medio de:
                    </label>
                    <li className="">{s.payment === "" ? "-" : s.payment}</li>
                  </div>
                </ul>

                <div className="flex justify-center h-16 md:h-12">
                  <button
                    className="bg-sky-200 hover:bg-sky-300 rounded-md flex justify-center items-center p-1 mx-2 my-1 md:w-auto w-12"
                    onClick={() => handleEdit(s)}
                  >
                    <img src={Edit} alt="" className="w-6" />
                  </button>
                  <button
                    className="bg-red-200 hover:bg-red-300 rounded-md flex justify-center items-center p-1 mx-2 my-1 md:w-auto w-12"
                    onClick={() => handleDelete(s._id)}
                  >
                    <img src={Delete} alt="" className="w-6" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No se han encontrado sesiones</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionPayment;
