import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TGuest } from '@/types/types';

type Props = {
	guest: TGuest;
	setFormSent: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RsvpForm({ guest, setFormSent }: Props) {
	const guestList = guest.guests - 1;
	return (
		<Formik
			initialValues={{
				phoneNumber: '',
				drinks: [],
				otherDrink: '',
				guests: guest.guests,
				isAttending: '',
				confirmed: 0,
			}}
			validationSchema={Yup.object({
				phoneNumber: Yup.string()
					.max(10, 'El teléfono no debe exceder 10 dígitos.')
					.matches(/^[0-9]+$/, 'Solo incluye números')
					.required('Debes ingresar un número de teléfono'),
				isAttending: Yup.string().required(
					'Debes seleccionar una opción'
				),
			})}
			onSubmit={(values, { setSubmitting }) => {
				for (const [key, value] of Object.entries(values)) {
					if (value === 'yes') {
						values.confirmed++;
						console.log(values.confirmed);
					}
				}
				const sendData = {
					phoneNumber: values.phoneNumber,
					drinks: values.drinks.join(', '),
					otherDrink: values.otherDrink,
					confirmed: values.confirmed,
					isAttending: values.isAttending,
				};
				return new Promise((resolve, reject) => {
					fetch(`/api/guestList/put/${guest.fullname}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},

						body: JSON.stringify(sendData),
					})
						.then((res) => {
							resolve(res);
							console.log('Response received');
							if (res.status === 200) {
								console.log('Response Succeeded');
							}
						})
						.catch((error) => {
							reject('error');
							console.error(error);
						})
						.finally(() => {
							setSubmitting(false);
							setFormSent(true);
						});
				});
			}}
		>
			{(formik) => (
				<Form
					action="/api/guestList"
					method="PUT"
					onSubmit={formik.handleSubmit}
					className="rsvp-form"
				>
					<h3>
						Confirmación de asistencia de: <br />{' '}
						{`${guest.firstName} ${guest.lastName}`}
					</h3>
					<h4>Invitados Asignados: {guest.guests}</h4>
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
							{...formik.getFieldProps('phoneNumber')}
						/>
						<div className="field-message">
							<ErrorMessage name="phoneNumber" />
						</div>
					</div>
					<h4 className="required">Confirmar Asistencia</h4>
					<section className="guest-confirm">
						<div className="input-group">
							<div className="radio-group">
								<p>
									{guest.firstName} {guest.lastName}
								</p>
								<div className="radio-button-options">
									<label
										htmlFor="isAttending"
										className="radio-button"
									>
										Sí
										<Field
											type="radio"
											name="isAttending"
											value="yes"
										/>
									</label>
									<label
										htmlFor="isAttending"
										className="radio-button"
									>
										No
										<Field
											type="radio"
											name="isAttending"
											value="no"
										/>
									</label>
								</div>
							</div>
							{[...Array(guestList)].map((atendee, index) => (
								<div className="radio-group" key={index}>
									<p>{`Invitado ${index + 1}`}</p>
									<div className="radio-button-options">
										<label
											htmlFor="attending"
											className="radio-button"
										>
											Sí
											<Field
												type="radio"
												name={`guestAttendance-${
													index + 1
												}`}
												value="yes"
											/>
										</label>
										<label
											htmlFor="attending"
											className="radio-button"
										>
											No
											<Field
												type="radio"
												name={`guestAttendance-${
													index + 1
												}`}
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
							<Field
								type="checkbox"
								name="drinks"
								value="tequila"
							/>
							Tequila
						</label>
						<label htmlFor="whiskey">
							<Field
								type="checkbox"
								name="drinks"
								value="whiskey"
							/>
							Whiskey
						</label>
						<label htmlFor="gin">
							<Field type="checkbox" name="drinks" value="gin" />
							Gin
						</label>
						<label htmlFor="other" className="input-other">
							Otro: &nbsp;
							<Field
								type="text"
								{...formik.getFieldProps('otherDrink')}
							/>
						</label>
					</div>
					<button
						className={`btn ${
							formik.isValid ? 'btn-form' : 'btn-form-disabled'
						}`}
						type="submit"
						disabled={!(formik.isValid && formik.dirty)}
					>
						Enviar
					</button>
				</Form>
			)}
		</Formik>
	);
}
