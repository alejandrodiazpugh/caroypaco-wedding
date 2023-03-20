import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';

type Props = {
	setter: React.Dispatch<React.SetStateAction<boolean>>;
	guestSetter: React.Dispatch<React.SetStateAction<any>>;
};

export default function RsvpCardInitial({ setter, guestSetter }: Props) {
	const [loading, setLoading] = useState(false);
	const [error, setShowError] = useState(false);

	return (
		<>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
				}}
				validationSchema={Yup.object({
					firstName: Yup.string()
						.max(255, 'El campo debe tener 255 carácteres o menos')
						.matches(
							/^[a-zA-Z\s]+$/,
							'No incluir acentos en el nombre'
						)
						.required('Ingresa tu nombre para buscar tus datos'),
					lastName: Yup.string()
						.max(255, 'El campo debe tener 255 carácteres o menos')
						.matches(
							/^[a-zA-Z\s]+$/,
							'No incluir acentos en el apellido'
						)
						.required('Ingresa tu apellido para buscar tus datos'),
				})}
				onSubmit={(values, { setSubmitting }) => {
					const firstNameJoined = values.firstName
							.split(' ')
							.join('')
							.toLowerCase(),
						lastNamesJoined = values.lastName
							.split(' ')
							.join('')
							.toLowerCase();
					const valueToSend = `${firstNameJoined}${lastNamesJoined}`;

					return new Promise((resolve, reject) => {
						fetch(`/api/guestList/get/${valueToSend}`, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
							},
						})
							.then((response) => {
								setLoading(true);
								console.log('response received');
								if (response.body === null) {
									throw new Error('null query');
								}
								if (response.status === 200) {
									resolve(response);
									response.json().then((res) => {
										guestSetter(res.body);
									});
									console.log('Response Succeeded');
									setter(true);
								}
							})
							.catch((error) => {
								reject(error);
								setShowError(true);
								console.error(error);
							})
							.finally(() => {
								setLoading(false);
								setSubmitting(false);
							});
					});
				}}
			>
				{(formik) => (
					<Form onSubmit={formik.handleSubmit}>
						<div className="form-group">
							<label htmlFor="firstName">Nombre:</label>
							<Field
								aria-label="Nombre"
								className="field"
								type="text"
								id="firstName"
								autoComplete="off"
								{...formik.getFieldProps('firstName')}
							/>
							<div className="field-message">
								<ErrorMessage name="firstName" />
							</div>
						</div>
						<div className="form-group">
							<label htmlFor="lastName">Apellido:</label>
							<Field
								aria-label="apellido"
								className="field"
								type="text"
								id="lastName"
								autoComplete="off"
								{...formik.getFieldProps('lastName')}
							/>
							<div className="field-message">
								<ErrorMessage name="lastName" />
							</div>
						</div>
						<button
							className={`btn ${
								formik.isValid
									? 'btn-form'
									: 'btn-form-disabled'
							}`}
							type="submit"
							disabled={!(formik.isValid && formik.dirty)}
						>
							{!loading ? (
								'Buscar'
							) : (
								<ClipLoader color="white" size="20px" />
							)}
						</button>
					</Form>
				)}
			</Formik>
			{error ? (
				<div className="error-message">Intente nuevamente </div>
			) : null}
		</>
	);
}
