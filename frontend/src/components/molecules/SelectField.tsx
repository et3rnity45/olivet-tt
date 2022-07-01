import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface SelectFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
	name: string;
	label: string;
	className?: string;
}

const SelectField = ({
	name,
	label,
	children,
	className = '',
	...rest
}: SelectFieldProps): JSX.Element => {
	const methods = useFormContext();
	return (
		<div className={className}>
			<label htmlFor={name} className='block text-sm font-normal text-gray-700'>
				{label}
			</label>
			<select
				id={name}
				{...methods.register(name)}
				{...rest}
				className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm'
			>
				{children}
			</select>
		</div>
	);
};

export default SelectField;
