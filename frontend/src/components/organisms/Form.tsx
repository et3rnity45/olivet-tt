import React, { FormEventHandler, ReactNode } from 'react';

type FormProps = {
	children: ReactNode;
	onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const Form = ({ children, onSubmit }: FormProps): JSX.Element => {
	return (
		<form onSubmit={onSubmit}>
			<fieldset className='overflow-hidden shadow sm:rounded-md'>{children}</fieldset>
		</form>
	);
};

Form.InputList = ({ children }: { children: ReactNode }) => (
	<div className='bg-white px-4 py-5 sm:p-6'>
		<div className='grid grid-cols-6 gap-6'>{children}</div>
	</div>
);

Form.ButtonList = ({ children }: { children: ReactNode }) => (
	<div className='bg-gray-50 px-4 py-3 text-right lg:px-6'>{children}</div>
);

export default Form;
