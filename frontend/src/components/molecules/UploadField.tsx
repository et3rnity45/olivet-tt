import React, { InputHTMLAttributes, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import Label from '@/components/atoms/Label';

interface UploadFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	className?: string;
}

const UploadField = ({ name, label, className, ...rest }: UploadFieldProps): JSX.Element => {
	const methods = useFormContext();
	const files: File[] = methods.watch(name);
	const onDrop = useCallback(
		(droppedFiles: unknown) => {
			methods.setValue(name, droppedFiles, { shouldValidate: true });
		},
		[name, methods]
	);

	useEffect(() => {
		methods.register(name);
	}, [name, methods]);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		multiple: false,
		accept: {
			'image/png': [],
			'image/jpg': [],
			'image/jpeg': [],
			'image/pdf': [],
		},
	});

	return (
		<div className={className}>
			<Label htmlFor={name} text={label} />
			<div
				{...getRootProps()}
				className={`mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-16 pb-20 ${
					isDragActive ? 'bg-gray-100' : ''
				}`}
			>
				<div className='flex flex-col justify-center space-y-1 text-center'>
					{files?.length ? (
						<img
							src={URL.createObjectURL(files[0])}
							alt={files[0].name}
							className='max-h-xs max-w-xs'
						/>
					) : (
						<svg
							className='mx-auto h-12 w-12 text-gray-400'
							stroke='currentColor'
							fill='none'
							viewBox='0 0 48 48'
							aria-hidden='true'
						>
							<path
								d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
								strokeWidth={2}
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					)}
					<div className='flex text-sm text-gray-600'>
						<label
							htmlFor={name}
							className='relative cursor-pointer rounded-md bg-white font-medium text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 hover:text-red-500'
						>
							<span>Séléctionner un fichier</span>
							<input id={name} type='file' className='sr-only' {...getInputProps()} {...rest} />
						</label>
						<p className='pl-1'>ou déposer un fichier</p>
					</div>
					<p className='text-xs text-gray-500'>
						{files ? files[0].name : "PNG, JPG, JPEG jusqu'à 30MB"}
					</p>
				</div>
			</div>
		</div>
	);
};

export default UploadField;
