import React from 'react';

type SubmitProps = {
	value: string;
	className?: string;
};

const LoginSubmit = ({ value, className }: SubmitProps): JSX.Element => {
	return (
		<input
			value={value.toLowerCase()}
			type='submit'
			placeholder='placeholder'
			className={`block w-full cursor-pointer rounded bg-lightRed px-4 py-2 text-center font-semibold uppercase text-white hover:bg-lighterRed focus:outline-none focus:ring focus:ring-lightRed focus:ring-opacity-80 focus:ring-offset-2 ${className}`}
		/>
	);
};

export default LoginSubmit;
