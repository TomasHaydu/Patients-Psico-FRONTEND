import { useDispatch, useSelector } from "react-redux";
import Patient from "../components/Patient";
import {
  onChangeSearch,
  patientsOrder,
} from "../features/patient/patientsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const patients = useSelector((state) => state.patients.patients);

  const handleSelect = (value) => {
      dispatch(patientsOrder(value));
    }
  

  return (
    <div>
      <div className="mx-4 my-6 flex justify-between items-center">
        <div className="md:block flex-col justify-center items-center">
          <label className="font-mono md:text-lg mx-2 text-slate-400">
            Buscador:
            <input
              type="text"
              list="patients"
              onChange={(e) => dispatch(onChangeSearch(e.target.value))}
              className="p-2 rounded-xl w-full md:w-8/12 border-2 text-slate-400 shadow-md"
            />
          </label>
          <datalist id="patients">
            {patients.map((patient) => (
              <option
                key={patient._id}
                value={patient.name + " " + patient.lastName}
              ></option>
            ))}
          </datalist>
        </div>
        <div className="md:block flex-col justify-center items-center text-slate-400">
          <label className="font-mono text-1xl md:mr-2"> Ordernar por:</label>
          <select
            className="w-3/5 md:w-32 p-3 rounded-lg text-xs mx-2 shadow-md"
            onChange={(e) => handleSelect(e.target.value)}
          >
            <option value="" disabled>
              -Ordernar por-
            </option>
            <option value="nombre">Nombre</option>
            <option value="apellido">Apellido</option>
            <option value="edad">Edad</option>
          </select>
        </div>
      </div>

      <div className="md:p-2 grid grid-cols-3 gap-1 md:grid-cols-6 md:gap-16 bg-gradient-to-b from-orange-100 to-orange-200 rounded-md mx-2 my-2">
        <p className="ml-4">Nombre</p>
        <p>Apellido</p>
        <p className="hidden md:block">Edad</p>
        <p className="hidden md:block">Telefono</p>
        <p className="col-span-2"></p>
      </div>

      {patients.length > 0 ? (
        patients.map((patient) => (
          <Patient
            key={patient._id}
            patient={patient}
          />
        ))
      ) : (
        <p className="md:text-lg text-base mx-4 my-4 md:mx-72 md:my-60">
          No existen pacientes aun. Vaya a "Nuevo Paciente" a su izquierda para
          agregar pacientes
        </p>
      )}
    </div>
  );
};

export default Home;
