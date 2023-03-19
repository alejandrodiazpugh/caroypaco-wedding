import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

type TDrink = "gin" | "rum" | "whiskey" | "tequila";
type TExtraAtendees = {
  fullName?: string;
  isAttending: boolean;
};

type TGuest = {
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber: string;
  drinks: Array<TDrink>;
  otherDrink: string;
  isAttending: boolean;
  extraAtendees: Array<TExtraAtendees>;
};

type Props = { guest: TGuest };

export default function RsvpForm({ guest }: Props) {
  const guestList = 1 + guest.extraAtendees.length;
  return (
    <Formik
      initialValues={{
        phoneNumber: guest.phoneNumber,
        drinks: guest.drinks,
        otherDrink: guest.otherDrink,
        guests: guest.extraAtendees,
        isAttending: guest.isAttending,
        peopleAttending: 0,
      }}
      validationSchema={Yup.object({
        phoneNumber: Yup.string()
          .max(10, "El teléfono no debe exceder 10 dígitos.")
          .matches(/^[0-9]+$/, "Solo incluye números")
          .required("Debes ingresar un número de teléfono"),
        isAttending: Yup.boolean().required("Debes seleccionar una opción"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        fetch(`/api/guests/${guest.fullName}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }).then((res) => {
          console.log("Response received");
          if (res.status === 200) {
            console.log("Response Succeeded");
          }
        });
        setSubmitting(false);
      }}
    >
      {(formik) => (
        <Form
          action="/api/contactFormApi"
          method="GET"
          onSubmit={formik.handleSubmit}
          className="rsvp-form"
        >
          <h3>
            Confirmación de asistencia de: <br /> {guest.fullName}
          </h3>
          <h4>Invitados Asignados: {guestList}</h4>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="required">
              Teléfono de contacto
            </label>
            <Field
              aria-label="Telefono"
              className="field"
              type="text"
              id="phoneNumber"
              autoComplete="off"
              {...formik.getFieldProps("phoneNumber")}
            />
            <div className="field-message">
              <ErrorMessage name="phoneNumber" />
            </div>
          </div>
          <h4 className="required">Confirmar Asistencia</h4>
          <section className="guest-confirm">
            <div className="input-group">
              <div className="radio-group">
                <p>{guest.fullName}</p>
                <div className="radio-button-options">
                  <label htmlFor="isAttending" className="radio-button">
                    Sí
                    <Field type="radio" name="isAttending" value={true} />
                  </label>
                  <label htmlFor="isAttending" className="radio-button">
                    No
                    <Field type="radio" name="isAttending" value={false} />
                  </label>
                </div>
              </div>
              {guest.extraAtendees.map((atendee, index) => (
                <div className="radio-group" key={index}>
                  <p>{atendee.fullName || `Invitado ${index + 1}`}</p>
                  <div className="radio-button-options">
                    <label htmlFor="attending" className="radio-button">
                      Sí
                      <Field
                        type="radio"
                        name={`guestAttendance-${index + 1}`}
                        value="yes"
                      />
                    </label>
                    <label htmlFor="attending" className="radio-button">
                      No
                      <Field
                        type="radio"
                        name={`guestAttendance-${index + 1}`}
                        value="no"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <h4>¿Qué te gusta tomar?</h4>
          <div className="checkbox-group">
            <label htmlFor="rum">
              <Field type="checkbox" name="drinks" value="rum" />
              Ron
            </label>
            <label htmlFor="tequila">
              <Field type="checkbox" name="drinks" value="tequila" />
              Tequila
            </label>
            <label htmlFor="whiskey">
              <Field type="checkbox" name="drinks" value="whiskey" />
              Whiskey
            </label>
            <label htmlFor="gin">
              <Field type="checkbox" name="drinks" value="gin" />
              Gin
            </label>
            <label htmlFor="other" className="input-other">
              Otro: &nbsp;
              <Field type="text" {...formik.getFieldProps("otherDrink")} />
            </label>
          </div>
          <button
            className={`btn ${
              formik.isValid ? "btn-form" : "btn-form-disabled"
            }`}
            type="button"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Enviar
          </button>
        </Form>
      )}
    </Formik>
  );
}
