import React, { InputHTMLAttributes } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Label from '@/components/atoms/Label';

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	hint: string;
	className?: string;
}

const CheckboxField = ({
	name,
	label,
	hint,
	className,
	...rest
}: CheckboxFieldProps): JSX.Element => {
	const methods = useFormContext();
	return (
		<div className={`flex ${className}`}>
			<Controller
				name={name}
				control={methods.control}
				render={({ field: { value, onChange } }) => {
					return (
						<input
							id={name}
							className='mr-3 h-4 w-4 rounded border-gray-300 text-lightRed shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-200 sm:text-sm'
							value={value}
							onChange={onChange}
							type='checkbox'
							{...rest}
						/>
					);
				}}
			/>
			<div>
				<Label htmlFor={name} text={label} />
				<p className='text-sm text-gray-500'>{hint}</p>
			</div>
		</div>
	);
};

export default CheckboxField;
