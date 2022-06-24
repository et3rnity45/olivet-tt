import React, { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/atoms/Label';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	className?: string;
}

const TextField = ({ name, label, className, ...rest }: TextFieldProps): JSX.Element => {
	const methods = useFormContext();
	return (
		<div className={className}>
			<Label htmlFor={name} text={label} />
			<Controller
				name={name}
				control={methods.control}
				render={({ field: { value, onChange } }) => {
					return (
						<input
							id={name}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm'
							value={value}
							onChange={onChange}
							{...rest}
						/>
					);
				}}
			/>
		</div>
	);
};

export default TextField;
