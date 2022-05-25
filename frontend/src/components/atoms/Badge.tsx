import React from 'react';

type BadgeProps = {
	text: string;
};

const Badge = ({ text }: BadgeProps): JSX.Element => {
	return (
		<span className='mb-4 inline-block rounded bg-lightRed py-1 px-2 text-xs font-medium uppercase tracking-widest text-white'>
			{text}
		</span>
	);
};

export default Badge;
