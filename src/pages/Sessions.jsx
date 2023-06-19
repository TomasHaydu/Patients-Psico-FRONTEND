import { useParams } from "react-router-dom";
import SessionPayment from "../components/SessionPayment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOnePatient } from "../features/patient/patientsSlice";
import { moveSessions } from "../features/sessions/sessionsSlice";

const Sessions = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const patient = useSelector((state) => state.patients.onePatient);

  useEffect(() => {
    dispatch(getOnePatient(id));
  }, []);

  useEffect(() => {
    if (patient.sessions) {
      dispatch(moveSessions(patient.sessions));
    }
  }, [patient]);

  return (
    <div className="overflow-y-auto md:overflow-hidden h-full">
      <div className="flex justify-center login text-4xl my-4">
        <p className="login w-3/4 text-center flex flex-col">
          Sesiones del paciente{" "}
          <span className="font-mono text-lg">{`(${patient.name} ${patient.lastName})`}</span>
        </p>
      </div>
      <SessionPayment />
    </div>
  );
};

export default Sessions;
