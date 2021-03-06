/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type InputProps = {
	type: string;
	name: string;
	label: string;
	register: UseFormRegister<any>;
	className?: string;
};

const LoginInput = ({ type, name, label, register, className }: InputProps): JSX.Element => {
	return (
		<div className={`relative ${className}`}>
			<input
				id={name}
				type={type}
				placeholder='placeholder'
				{...register(name)}
				className='border-gray peer h-10 w-full border-0 border-b-2 text-lightBlack placeholder-transparent focus:border-darkBlue focus:outline-none focus:ring-0'
			/>
			<label
				htmlFor={name}
				className='text-gray peer-placeholder-shown:text-gray peer-focus:text-gray absolute left-0 -top-3.5 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-3.5 peer-focus:text-sm'
			>
				{label}
			</label>
		</div>
	);
};

export default LoginInput;
