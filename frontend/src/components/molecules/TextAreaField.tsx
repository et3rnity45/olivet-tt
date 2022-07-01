import React, { TextareaHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
	className?: string;
}

const TextAreaField = ({ name, label, className, ...rest }: TextAreaFieldProps): JSX.Element => {
	const methods = useFormContext();
	return (
		<div className={className}>
			<label htmlFor={name} className='block text-sm font-normal text-gray-700'>
				{label}
			</label>
			<Controller
				name={name}
				control={methods.control}
				render={({ field: { value, onChange } }) => {
					return (
						<textarea
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

export default TextAreaField;
