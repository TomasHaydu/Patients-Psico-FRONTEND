import { useNavigate } from "react-router-dom";

import Ver from "../img/info-btn.svg";
import Edit from "../img/edit-btn.svg";
import Delete from "../img/delete-btn.svg";
import { deleteToAPI } from "../features/patient/patientsSlice";
import { useDispatch } from "react-redux";

const Patient = ({ patient }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Desea ELIMINAR este paciente?");

    if (confirmed) {
      try {
        dispatch(deleteToAPI(id));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-6 md:p-2 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-16 rounded-sm md:mx-2 border-b-2 mt-2 overflow-y-auto hover:bg-neutral-100 hover:shadow-md">
      <p className="md:ml-4">{patient.name}</p>
      <p className="max-w-xs">{patient.lastName}</p>
      <p className="hidden md:block">{patient.years}</p>
      <p className="hidden md:block">
        {patient.phone === null ? "-" : patient.phone}
      </p>
      <div className="flex justify-between w-32 gap-1 md:gap-2 md:w-36">
        <button
          className="p-2 bg-gradient-to-tr from-yellow-100 to-yellow-200 rounded-md hover:from-yellow-200 hover:to-yellow-200"
          onClick={() => navigate(`/patients/${patient._id}`)}
        >
          <img src={Ver} alt="" />
        </button>
        <button
          className="p-2 bg-gradient-to-tr from-blue-50 to-blue-100 rounded-md hover:from-blue-100 hover:to-blue-100 "
          onClick={() => navigate(`/patients/edit/${patient._id}`)}
        >
          <img src={Edit} alt="" />
        </button>
        <button
          className="p-2 bg-gradient-to-tr from-red-100 to-red-200 rounded-md hover:from-red-200 hover:to-red-200"
          onClick={() => handleDelete(patient._id)}
        >
          <img src={Delete} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Patient;
