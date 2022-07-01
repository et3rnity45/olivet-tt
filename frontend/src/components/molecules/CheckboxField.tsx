import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	placeholder?: string;
	helperText?: string;
	type?: string;
	readOnly?: boolean;
	validation?: any;
	className?: string;
}

const CheckboxField = ({
	id,
	label,
	placeholder = '',
	helperText = '',
	readOnly = false,
	validation,
	className,
	...rest
}: CheckboxFieldProps): JSX.Element => {
	const { register } = useFormContext();
	return (
		<div className={className}>
			<div className='relative mt-1 flex rounded-md shadow-sm'>
				<input
					{...register(id, validation)}
					{...rest}
					type='checkbox'
					name={id}
					id={id}
					readOnly={readOnly}
					className='mr-3 h-4 w-4 rounded border-gray-300 text-lightRed shadow-sm focus:border-red-500 focus:ring-red-500 disabled:bg-gray-200 sm:text-sm'
					placeholder={placeholder}
					aria-describedby={id}
				/>
				<div>
					<label htmlFor={id} className='block text-sm font-normal text-gray-700'>
						{label}
					</label>
					{helperText !== '' && <p className='text-xs text-gray-500'>{helperText}</p>}
				</div>
			</div>
		</div>
	);
};

export default CheckboxField;
