import React, { useMemo } from 'react';
import DataTable from 'react-data-table-component';
import { useQuery } from '@apollo/client';
import { RefreshIcon } from '@heroicons/react/outline';
import { PlayersQuery } from '@/graphql/queries/player';
import PlayerType from '@/types/Player';

type RowProps = {
	index: number;
	fullname: string;
	valcla: string;
	clast: string;
	point: number;
	monthEvolution: number;
	yearEvolution: number;
};

const Ranking = (): JSX.Element => {
	const { loading, error, data } = useQuery(PlayersQuery);
	const players = data?.players.map((player: PlayerType, index: number) => ({
		...player,
		index: index + 1,
		fullname: `${player.nom} ${player.prenom}`,
		point: Number(player.point.toFixed(1)),
		monthEvolution: Number((player.point - player.apoint).toFixed(1)),
		yearEvolution: Number((player.point - player.valinit).toFixed(1)),
	}));

	const columns = useMemo(
		() => [
			{
				name: '#',
				selector: (row: RowProps) => row.index,
				sortable: true,
			},
			{
				name: 'Nom prénom',
				selector: (row: RowProps) => row.fullname,
				sortable: true,
			},
			{
				name: 'Points officiels',
				selector: (row: RowProps) => row.valcla,
				sortable: true,
			},
			{
				name: 'Classement officiel',
				selector: (row: RowProps) => row.clast,
				sortable: false,
			},
			{
				name: 'Points menseuls',
				selector: (row: RowProps) => row.point,
				sortable: true,
			},
			{
				name: 'Evolution mensuelle',
				selector: (row: RowProps) => row.monthEvolution,
				sortable: true,
				cell: ({ monthEvolution }: { monthEvolution: number }) => {
					if (monthEvolution < 0) return <div className='text-red-500'>{monthEvolution}</div>;
					if (monthEvolution > 0) return <div className='text-green-500'>+{monthEvolution}</div>;
					return <div>{monthEvolution}</div>;
				},
			},
			{
				name: 'Evolution annuelle',
				selector: (row: RowProps) => row.yearEvolution,
				sortable: true,
				cell: ({ yearEvolution }: { yearEvolution: number; monthEvolution: number }) => {
					if (yearEvolution < 0) return <div className='text-red-500'>{yearEvolution}</div>;
					if (yearEvolution > 0) return <div className='text-green-500'>+{yearEvolution}</div>;
					return <div>{yearEvolution}</div>;
				},
			},
		],
		[]
	);

	return (
		<section className='py-16' id='planning'>
			<div className='container mx-auto px-3'>
				<h2 className='mb-4 lg:mb-8'>Classement du Club</h2>
				{loading && (
					<div className='flex h-96 items-center justify-center'>
						<RefreshIcon className='h-20 w-20 rotate-180 transform animate-spin' />
					</div>
				)}
				{error && (
					<div className='flex h-96 flex-col items-center justify-center text-center text-xl'>
						<span className='mr-1 font-bold'>Erreur :</span>
						{error.message}
					</div>
				)}
				{data?.players && (
					<DataTable
						className='uppercase'
						data={players}
						columns={columns}
						striped
						pagination
						paginationPerPage={15}
						paginationRowsPerPageOptions={[15, 30, 50, 100]}
					/>
				)}
			</div>
		</section>
	);
};

export default Ranking;
