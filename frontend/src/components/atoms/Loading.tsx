import React from 'react';
import { RefreshIcon } from '@heroicons/react/outline';

const Loading = (): JSX.Element => {
	return (
		<div className='flex h-32 items-center justify-center'>
			<RefreshIcon className='h-20 w-20 rotate-180 transform animate-spin' />
		</div>
	);
};

export default Loading;
