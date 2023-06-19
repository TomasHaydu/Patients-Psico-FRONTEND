/* eslint-disable eqeqeq */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Edit from "../img/edit-btn.svg";
import Delete from "../img/delete-btn.svg";
import { useEffect } from "react";
import { deleteToAPI, getOnePatient } from "../features/patient/patientsSlice";
import { moveSessions } from "../features/sessions/sessionsSlice";


const InfoPatient = () => {
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOnePatient(id))
  }, [])

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const patient = useSelector((state) => state.patients.onePatient);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Desea ELIMINAR este paciente?");

    if (confirmed) {
      try {
        dispatch(deleteToAPI(id));
        navigate("/patients")
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSessions = () => {
    dispatch(moveSessions(patient.sessions))
    navigate(`/patients/sessions/${patient._id}`)
  }

  return (
    <div className="overflow-y-auto h-full">
      <div className="flex justify-center login text-4xl my-4 mx-2">
        <p className="login w-3/4 text-center">Información del paciente:</p>
        <div className="flex gap-2">
          <button
            className="p-2 w-12 bg-blue-100 rounded-md hover:bg-blue-200 hover:shadow-md"
            onClick={() => navigate(`/patients/edit/${patient._id}`)}
          >
            <img src={Edit} alt="" />
          </button>
          <button
            className="p-2 w-12 bg-red-100 rounded-md  hover:bg-red-200 hover:shadow-md"
            onClick={() => handleDelete(patient._id)}
          >
            <img src={Delete} alt="" />
          </button>
        </div>
      </div>
      <div className="flex w-11/12 flex-col items-center justify-around mx-2 md:mx-8 my-4 p-2 rounded-lg">
        <div className="flex flex-col md:flex-row w-full items-start justify-between">
          <div>
            <label className="login text-2xl underline my-2">
              Datos Básicos
            </label>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Nombre
                </label>
                <p className="text-lg">
                  {patient.name === "" ? "-" : patient.name}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Apellido
                </label>
                <p className="text-lg ">
                  {patient.lastName === "" ? "-" : patient.lastName}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">Edad</label>
                <p className="text-lg ">
                  {patient.years === "" ? "-" : patient.years}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Telefono
                </label>
                <p className="text-lg ">
                  {patient.phone === null ? "-" : patient.phone}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-start justify-between">
            <label className="login text-2xl underline my-2">
              Info de contacto
            </label>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Dirección
                </label>
                <p className="text-lg ">
                  {patient.adress === "" ? "-" : patient.adress}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">DNI</label>
                <p className="text-lg ">
                  {patient.dni === null ? "-" : patient.dni}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  E-Mail
                </label>
                <p className="text-lg ">
                  {patient.email === "" ? "-" : patient.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full items-start justify-between">
          <div className="flex flex-col">
            <label className="login text-2xl underline my-2">
              Información Psicológica
            </label>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Diagnostico
                </label>
                <p className="text-lg ">
                  {patient.diagnostico === "" ? "-" : patient.diagnostico}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Obra Social
                </label>
                <p className="text-lg  overflow-y-auto">
                  {patient.obraSocial === "" ? "-" : patient.obraSocial}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold underline text-xl">
                  Derivacion
                </label>
                <p className="text-lg ">
                  {patient.derivacion === "" ? "-" : patient.derivacion}
                </p>
              </div>
              <div className="flex gap-2">
                <label className="font-semibold break-words overflow-y-auto underline text-xl">
                  Tratamiento Complementario
                </label>
                <p className="text-lg ">
                  {patient.tratamientoComplementario === ""
                    ? "-"
                    : patient.tratamientoComplementario}
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <label className="login text-2xl underline my-2">
              Observaciones
            </label>
            <p className="flex md:flex-row md:break-keep break-words flex-col text-lg  w-11/12 overflow-y-auto md:h-16 h-32">
              {patient.observaciones === "" ? "-" : patient.observaciones}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSessions()}
          className="md:my-4 my-1 p-2 w-1/2 md:w-1/4 bg-gradient-to-t from-orange-300 to-orange-200 hover:border-orange-300 border-2 border-orange-200 hover:shadow-md login text-center rounded-xl"
        > Sesiones
        </button>
      </div>
    </div>
  );
};

export default InfoPatient;
