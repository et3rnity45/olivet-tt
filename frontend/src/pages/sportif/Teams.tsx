import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from '@apollo/client';
import { Tab } from '@headlessui/react';
import { RefreshIcon } from '@heroicons/react/outline';
import { PoulesQuery } from '@/graphql/queries/poule';
import PouleType from '@/types/Poule';
import classNames from '@/utils/classNames';

type RowProps = {
	clt: string;
	equipe: string;
	pts: number;
	joue: number;
	vic: number;
	nul: number;
	def: number;
	pf: number;
	pg: number;
	pp: number;
};

const Teams = (): JSX.Element => {
	const { loading, error, data } = useQuery(PoulesQuery);

	const columns = useMemo(
		() => [
			{ name: '#', selector: (row: RowProps) => row.clt, width: '50px' },
			{ name: 'équipe', selector: (row: RowProps) => row.equipe },
			{ name: 'Points', selector: (row: RowProps) => row.pts, width: '70px' },
			{ name: 'Joué', selector: (row: RowProps) => row.joue, width: '70px' },
			{ name: 'V', selector: (row: RowProps) => row.vic, width: '50px' },
			{ name: 'N', selector: (row: RowProps) => row.nul, width: '50px' },
			{ name: 'D', selector: (row: RowProps) => row.def, width: '50px' },
			{ name: 'FF/P', selector: (row: RowProps) => row.pf, width: '50px' },
			{ name: 'PG', selector: (row: RowProps) => row.pg, width: '70px' },
			{ name: 'PP', selector: (row: RowProps) => row.pp, width: '70px' },
		],
		[]
	);

	return (
		<section className='py-16' id='planning'>
			<div className='container mx-auto px-3 text-center lg:text-left'>
				<h2 className='mb-4 lg:mb-8'>Classement des Équipes</h2>
				{loading ? (
					<div className='flex h-96 items-center justify-center'>
						<RefreshIcon className='h-20 w-20 rotate-180 transform animate-spin' />
					</div>
				) : null}
				{error ? (
					<div className='flex h-96 flex-col items-center justify-center text-center text-xl'>
						<span className='mr-1 font-bold'>Erreur :</span>
						{error.message}
					</div>
				) : null}
				{data?.poules ? (
					<Tab.Group>
						<Tab.List className='flex flex-wrap justify-center pt-8 uppercase'>
							{data.poules.map((poule: PouleType, index: number) => (
								<Tab
									key={poule.id}
									className={({ selected }) =>
										classNames(
											'text-sx mx-2 mb-2 cursor-pointer p-2 uppercase md:text-sm',
											selected ? 'bg-lightRed text-white' : 'hover:bg-gray-200'
										)
									}
								>
									équipe {index + 1}
								</Tab>
							))}
						</Tab.List>
						<Tab.Panels>
							{data.poules.map((poule: PouleType) => (
								<Tab.Panel key={poule.id}>
									<h3 className='mt-8 text-center text-2xl uppercase tracking-wide'>
										{poule.libdivision}
									</h3>
									<DataTable
										className='uppercase'
										data={poule.teams}
										columns={columns}
										striped
										highlightOnHover
									/>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>
				) : null}
			</div>
		</section>
	);
};

export default Teams;
