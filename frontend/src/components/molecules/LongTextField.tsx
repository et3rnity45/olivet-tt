import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import RichTextEditor from '@/components/atoms/RichTextEditor';
import Label from '@/components/atoms/Label';

type LongTextFiledProps = {
	name: string;
	label: string;
	className?: string;
};

const LongTextField = ({ name, label, className }: LongTextFiledProps): JSX.Element => {
	const methods = useFormContext();
	return (
		<div className={className}>
			<Label htmlFor={name} text={label} />
			<div className='mt-1 border border-gray-300 shadow-sm'>
				<Controller
					name={name}
					control={methods.control}
					render={({ field }) => {
						return <RichTextEditor value={field.value} onChange={field.onChange} />;
					}}
				/>
			</div>
		</div>
	);
};

export default LongTextField;
