import Forms from "../components/Forms";

const NewPatient = () => {
  return (
    <div className="overflow-y-auto h-full">
      <div>
        <h2 className="font-bold text-2xl flex justify-center mt-5 login">
          Agregar nuevo paciente
        </h2>
        <p className="font-serif text-base flex text-center my-2 justify-center">
          Complete el formulario para poder agregar un nuevo paciente
        </p>
      </div>

      <div>
        <Forms />
      </div>
    </div>
  );
};

export default NewPatient;
