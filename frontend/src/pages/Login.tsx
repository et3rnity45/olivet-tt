import React from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyQuery } from '@apollo/client';
import logo from '@/assets/logo/olivet-tt-black.png';
import Input from '@/components/atoms/LoginInput';
import Submit from '@/components/atoms/LoginSubmit';
import LoginQuery from '@/graphql/queries/login';

type LoginForm = {
	email: string;
	password: string;
};

const schema = yup.object().shape({
	email: yup.string().email('Need to be a valid email').required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(4, 'Password must be at least 4 characters long'),
});

const Login = (): JSX.Element => {
	const navigate = useNavigate();
	const [getToken, { error, data }] = useLazyQuery(LoginQuery);
	if (data) {
		localStorage.setItem('token', data.login.token);
		navigate('/admin');
	}

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LoginForm>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<LoginForm> = (input) => {
		getToken({ variables: { input } });
		reset();
	};

	return (
		<section className='mx-4 py-16' id='login'>
			<div className='mx-auto flex max-w-sm flex-col rounded bg-white px-10 py-8 shadow-2xl'>
				<div className='mb-8 flex items-center justify-center'>
					<img className='h-32' src={logo} alt='Olivet TT Logo' />
				</div>
				<h3 className='text-xl font-bold'>
					Identifiez-vous avec votre adresse email et votre mot de passe
				</h3>
				<form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
					<Input type='email' name='email' label='Adresse Email' register={register} />
					{errors.email && <p className='text-sm text-red-500'>{errors.email.message}</p>}
					<Input
						className='mt-10'
						type='password'
						name='password'
						label='Mot de Passe'
						register={register}
					/>
					{errors.password && <p className='text-sm text-red-500'>{errors.password.message}</p>}
					{error && <p className='text-sm text-red-500'>{error.message}</p>}
					<Submit className='mt-10' value='Se connecter' />
				</form>
			</div>
		</section>
	);
};

export default Login;
