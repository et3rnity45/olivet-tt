import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import Label from '@/components/atoms/Label';

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
			<Label htmlFor={name} text={label} />
			<select
				id={name}
				{...methods.register(name)}
				{...rest}
				className='mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
			>
				{children}
			</select>
		</div>
	);
};

export default SelectField;
