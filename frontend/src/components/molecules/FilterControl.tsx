import React from 'react';
import FilterButton from '@/components/atoms/FilterButton';
import classNames from '@/utils/classNames';

type FilterControlProps = {
	filter: string | undefined;
	setFilter: React.Dispatch<React.SetStateAction<string | undefined>>;
	options: string[];
	className?: string;
};

const FilterControl = ({
	filter,
	setFilter,
	options,
	className = '',
}: FilterControlProps): JSX.Element => {
	return (
		<div className={classNames('mb-8 flex', className)}>
			<div className='border-r border-darkGray border-opacity-40'>
				<FilterButton
					text='Tous'
					active={filter === undefined}
					onClick={() => setFilter(undefined)}
				/>
			</div>
			<ul className='flex'>
				{options.map((option: string) => {
					const isActive = option === filter;
					return (
						<li key={option}>
							<FilterButton text={option} active={isActive} onClick={() => setFilter(option)} />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default FilterControl;
