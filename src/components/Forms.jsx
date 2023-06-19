import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alert from "./Alert";
import { useDispatch } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  editToAPI,
  addToAPI,
  patientsOrder,
} from "../features/patient/patientsSlice";

const Forms = ({patient}) => {
  const dispatch = useDispatch();

  const [resultArrived, setResultArrived] = useState(false);

  const newPatientSchema = Yup.object().shape({
    name: Yup.string()
      .required("Campo obligatorio")
      .min(3, "Minimo 3 caracteres")
      .max(20, "Maximo 20 caracteres")
      .matches(
        /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g,
        "Solo letras"
      ),
    lastName: Yup.string()
      .required("Campo obligatorio")
      .min(3, "Minimo 3 caracteres")
      .max(20, "Maximo 20 caracteres")
      .matches(/^[a-z ,.'-]+$/i, "Solo letras"),
    years: Yup.number("Solo numeros")
      .required("Campo obligatorio")
      .positive("Solo numeros positivos")
      .max(99, "Solo years de 2 digitos"),
    dni: Yup.number("Solo numeros")
      .positive("Solo numeros positivos")
      .min(9999999, "Minimo 7 digitos")
      .max(99999999, "Maximo 8 digitos"),
    phone: Yup.number("Solo numeros")
      .positive("Solo numeros positivos")
      .max(999999999999999, "Demasidos caracteres"),
    email: Yup.string()
      .email("Formato de correo electrónico inválido")
      .max(50, "Máximo 50 caracteres"),
  });

  const handleSubmit = async (value) => {
    value.years === "" ? value.years = null : value.years
    value.phone === "" ? value.phone = null : value.phone
    value.dni === "" ? value.dni = null : value.dni
    try {
      if (patient._id) {
        // Editar Paciente
        value._id = patient._id
        dispatch(editToAPI(value));
      } else {
        // Nuevo Paciente
        dispatch(addToAPI(value));
      }
    } catch (error) {
      console.log(error);
    }
    setResultArrived(true);
  };

  if (resultArrived === true) {
    return <Navigate to="/patients" />;
  } else {
    return (
      <div>
        <Formik
          initialValues={{
            name: patient?.name ?? "",
            lastName: patient?.lastName ?? "",
            adress: patient?.adress ?? "",
            years: patient?.years ?? "",
            dni: patient?.dni ?? "",
            phone: patient?.phone ?? "",
            email: patient?.email ?? "",
            diagnostico: patient?.diagnostico ?? "",
            obraSocial: patient?.obraSocial ?? "",
            derivacion: patient?.derivacion ?? "",
            tratamientoComplementario: patient?.tratamientoComplementario ?? "",
            observaciones: patient?.observaciones ?? "",
          }}
          enableReinitialize={true}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values);
            resetForm();
          }}
          validationSchema={newPatientSchema}
        >
          {({ errors, touched }) => {
            return (
              <Form className="mt-4 mx-4 flex flex-col items-center">
                <div className="flex flex-col md:flex-row justify-center items-center ">
                  <div className="flex flex-col items-center w-3/4">
                    <label className="underline font-bold">
                      Información Principal
                    </label>
                    <div className="flex flex-col w-full">
                      <div className="w-full flex gap-4 justify-center">
                      <div className="my-2">
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Nombre*"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                        {errors.name && touched.name ? (
                          <Alert>{errors.name}</Alert>
                        ) : null}
                      </div>
                      <div className="my-2">
                        <Field
                          type="text"
                          id="lastName"
                          name="lastName"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                          placeholder="Apellido*"
                        />
                        {errors.lastName && touched.lastName ? (
                          <Alert>{errors.lastName}</Alert>
                        ) : null}
                      </div>
                      </div>
                      <div className="w-full flex gap-4 justify-center">
                      <div className="my-2">
                        <Field
                          type="number"
                          id="years"
                          name="years"
                          placeholder="Edad*"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                        {errors.years && touched.years ? (
                          <Alert>{errors.years}</Alert>
                        ) : null}
                      </div>
                      <div className="my-2">
                        <Field
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Telefono"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                        {errors.phone && touched.phone ? (
                          <Alert>{errors.phone}</Alert>
                        ) : null}
                      </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center w-3/4 my-4">
                    <label className="underline font-bold">
                      Información de contacto
                    </label>
                    <div className="flex flex-wrap justify-center">
                      <div className="my-2">
                        <Field
                          type="text"
                          id="adress"
                          name="adress"
                          placeholder="Dirección"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                      </div>

                      <div className="my-2">
                        <Field
                          type="email"
                          id="email"
                          name="email"
                          placeholder="E-mail"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                        {errors.email && touched.email ? (
                          <Alert>{errors.email}</Alert>
                        ) : null}
                      </div>

                      <div className="my-2">
                        <Field
                          type="number"
                          id="dni"
                          name="dni"
                          placeholder="DNI"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                        {errors.dni && touched.dni ? (
                          <Alert>{errors.dni}</Alert>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center md:items-start">
                  <div className="flex flex-col items-center my-4 md:w-full w-3/4">
                    <label className="underline font-bold">
                      Información Psicológica
                    </label>
                    <div className="flex flex-col md:flex-row justify-center w-full md:gap-4 gap-2">
                      <div className="my-2">
                        <Field
                          type="text"
                          id="diagnostico"
                          name="diagnostico"
                          placeholder="Diagnóstico"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                      </div>
                      <div className="my-2">
                        <Field
                          type="text"
                          id="obraSocial"
                          name="obraSocial"
                          placeholder="Obra Social"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                      </div>

                      <div className="my-2">
                        <Field
                          type="text"
                          id="derivacion"
                          name="derivacion"
                          placeholder="Derivación"
                          className="bg-slate-50 rounded-lg w-full border-2 hover:bg-slate-100 p-1"
                        />
                      </div>

                      <div className="my-2">
                        <Field
                          as="select"
                          id="tratamientoComplementario"
                          name="tratamientoComplementario"
                          className="bg-slate-50 rounded-lg w-full md:w-full border-2 hover:bg-slate-100 p-1"
                        >
                          <option value="">
                            --Tratamiento Complementario--
                          </option>
                          <option value="psicopedagogia">Psicopedagogía</option>
                          <option value="fonoaudiologia">Fonoaudiología</option>
                          <option value="terapia-ocupacional">
                            Terapia Ocupacional
                          </option>
                          <option value="acompañamiento-terapeutico">
                            Acompañamiento Terapéutico
                          </option>
                        </Field>
                      </div>
                    </div>
                  </div>

                  <div className="my-2 md:flex-row flex-col justify-center items-center mb-2 w-full">
                    <Field
                      as="textarea"
                      id="observaciones"
                      name="observaciones"
                      placeholder="Observaciones"
                      className="bg-slate-50 rounded-lg w-full h-24 border-2 hover:bg-slate-100 p-1"
                    />
                  </div>
                </div>

                <div className="flex justify-center w-full">
                  <input
                    className={
                      patient._id
                        ? "mb-10 md:mb-5 bg-gradient-to-tr from-blue-50 to-blue-100 hover:bg-blue-200 p-4 rounded-3xl w-3/5 md:w-1/5 font-bold text-lg hover:shadow-md"
                        : "mb-10 md:mb-5 bg-gradient-to-tr from-amber-100 to-amber-200 hover:bg-amber-300 p-4 rounded-3xl w-3/5 md:w-1/5 font-bold text-lg hover:shadow-md"
                    }
                    value={patient._id ? "Editar" : "Agregar"}
                    type="submit"
                  ></input>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
};

Forms.defaultProps = {
  patient: {},
};

export default Forms;
