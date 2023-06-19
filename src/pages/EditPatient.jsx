/* eslint-disable eqeqeq */

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Forms from "../components/Forms";
import { useEffect } from "react";
import { getOnePatient } from "../features/patient/patientsSlice";

const EditPatient = () => {

  const {id} = useParams();

  const dispatch = useDispatch()

  const patient = useSelector((state) => state.patients.onePatient);

  useEffect(() => {
    dispatch(getOnePatient(id));
  }, [])

  return (
    <div className="overflow-y-auto h-full">
      <div>
        <h2 className="font-bold text-2xl flex justify-center mt-5 login">
          Editar paciente
        </h2>
        <p className="font-serif text-base flex text-center my-2 justify-center">
          Edite el formulario para poder corregir datos del paciente
        </p>
      </div>

      <div>
        {patient.name ? (
          <Forms patient={patient} />
        ) : (
          <p className="flex justify-center mt-40 text-lg p-2 border-2 bg-slate-50 mx-20">
            Este paciente no existe
          </p>
        )}
      </div>
    </div>
  );
};

export default EditPatient;
