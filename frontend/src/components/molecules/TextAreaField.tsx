import React, { TextareaHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/atoms/Label';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	label: string;
	className?: string;
}

const TextAreaField = ({ name, label, className, ...rest }: TextAreaFieldProps): JSX.Element => {
	const methods = useFormContext();
	return (
		<div className={className}>
			<Label htmlFor={name} text={label} />
			<Controller
				name={name}
				control={methods.control}
				render={({ field: { value, onChange } }) => {
					return (
						<textarea
							id={name}
							className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
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
