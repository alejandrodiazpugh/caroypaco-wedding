import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';

type Props = {};

export default function RsvpForm({}: Props) {
	return (
		<Formik
			initialValues={{
				fullName: '',
			}}
			validationSchema={Yup.object({
				fullName: Yup.string()
					.max(255, 'El campo debe tener 255 carácteres o menos')
					.matches(/^[a-zA-Z\s]+$/, 'No incluir acentos en el nombre')
					.required('Ingresa tu nombre para buscar tus datos'),
				phoneNumber: Yup.string()
					.max(
						10,
						'El número de teléfono no debe exceder 10 dígitos.'
					)
					.matches(/@"\d{10}$/, 'Solo incluye números'),
			})}
			onSubmit={(values, { setSubmitting }) => {
				fetch('/api/contactFormApi', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				}).then((res) => {
					console.log('Response received');
					if (res.status === 200) {
						console.log('Response Succeeded');
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
				>
					<div className="form-group">
						<label htmlFor="fullName">Nombre Completo:</label>
						<Field
							aria-label="Nombre completo"
							className="field"
							type="text"
							id="fullName"
							autoComplete="off"
							{...formik.getFieldProps('fullName')}
						/>
						<div className="field-message">
							<ErrorMessage name="fullName" />
						</div>
					</div>
					<button
						className={`btn ${
							formik.isValid ? 'btn-form' : 'btn-form-disabled'
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
