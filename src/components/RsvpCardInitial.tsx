import React, { useRef, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ClipLoader } from 'react-spinners';
import * as Yup from 'yup';

type Props = {
	setter: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RsvpCardInitial({ setter }: Props) {
	const [loading, setLoading] = useState(false);
	const handleClick = (e: React.MouseEvent) => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			setter(true);
		}, 2000);
	};
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
				fetch(`/api/guest/${values.fullName}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((res) => {
					console.log('Response received');
					if (res.status === 200) {
						setter(true);
						console.log('Response Succeeded');
					}
				});
				setSubmitting(false);
			}}
		>
			{(formik) => (
				<Form onSubmit={formik.handleSubmit}>
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
						onClick={(e) => handleClick(e)}
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
	);
}
