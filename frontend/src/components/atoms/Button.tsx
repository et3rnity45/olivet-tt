import React, { ButtonHTMLAttributes } from 'react';
import classNames from '@/utils/classNames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	outline?: boolean;
	className?: string;
}

const Button = ({ text, type, outline = false, className = '' }: ButtonProps): JSX.Element => {
	return (
		<button
			type={type}
			className={classNames(
				'inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm',
				'transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
				outline ? 'border-red-600 text-red-600 hover:text-white' : 'bg-red-600 text-white',
				className
			)}
		>
			{text}
		</button>
	);
};

export default Button;
