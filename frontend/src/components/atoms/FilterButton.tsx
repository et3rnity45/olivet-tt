import React, { MouseEventHandler } from 'react';
import classNames from '@/utils/classNames';

type FilterButtonProps = {
	text: string;
	active: boolean;
	onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

const FilterButton = ({ text, active, onClick }: FilterButtonProps): JSX.Element => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={classNames(
				'm-2 cursor-pointer p-2 text-xs uppercase md:text-sm',
				active ? 'bg-lightRed text-white' : 'hover:bg-gray-200'
			)}
		>
			{text}
		</button>
	);
};

export default FilterButton;
