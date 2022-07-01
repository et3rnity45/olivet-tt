import React, { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import classNames from '@/utils/classNames';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	placeholder?: string;
	helperText?: string;
	type?: string;
	readOnly?: boolean;
	validation?: any;
	className?: string;
}

const TextField = ({
	id,
	label,
	placeholder = '',
	helperText = '',
	type = 'text',
	readOnly = false,
	validation,
	className,
	...rest
}: TextFieldProps): JSX.Element => {
	const {
		register,
		formState: { errors },
	} = useFormContext();
	return (
		<div className={className}>
			<label htmlFor={id} className='block text-sm font-normal text-gray-700'>
				{label}
			</label>
			<div className='relative mt-1 rounded-md shadow-sm'>
				<input
					{...register(id, validation)}
					{...rest}
					type={type}
					name={id}
					id={id}
					readOnly={readOnly}
					className={classNames(
						readOnly
							? 'cursor-not-allowed border-gray-300 bg-gray-100 focus:border-gray-300 focus:ring-0'
							: errors[id]
							? 'border-red-500 focus:border-red-500 focus:ring-red-500'
							: 'focus:ring-primary-500 focus:border-primary-500 border-gray-300',
						'block w-full rounded-md shadow-sm'
					)}
					aria-invalid={!!errors}
					placeholder={placeholder}
					aria-describedby={id}
				/>
				{errors[id] && (
					<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
						<ExclamationCircleIcon className='text-xl text-red-500 h-5 w-5' />
					</div>
				)}
			</div>
			<div className='mt-1'>
				{helperText !== '' && <p className='text-xs text-gray-500'>{helperText}</p>}
				{errors[id] && <span className='text-sm text-red-500'>{errors[id].message}</span>}
			</div>
		</div>
	);
};

export default TextField;
