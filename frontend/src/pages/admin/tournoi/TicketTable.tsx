/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import { useMutation, useQuery } from '@apollo/client';
import { DownloadIcon, TrashIcon } from '@heroicons/react/outline';
import { Tab } from '@headlessui/react';
import { TicketsQuery } from '@/graphql/queries/ticket';
import { DeleteTicket } from '@/graphql/mutations/ticket';
import { BracketsQuery } from '@/graphql/queries/bracket';
import BracketType from '@/types/Bracket';
import TicketType from '@/types/Ticket';
import classNames from '@/utils/classNames';
import Loading from '@/components/atoms/Loading';

const columns = ['#', 'Nom', 'N° de licence', 'Email', 'Tél', 'Réglement', "Date d'inscription"];
const columns2 = ['#', 'Nom', 'Places', 'Places Restantes'];
const columnsAll = [
	'#',
	'Nom',
	'N° de licence',
	'Tableaux',
	'Email',
	'Tél',
	'Réglement',
	"Date d'inscription",
];

const headers = [
	{ label: 'Prénom', key: 'firstname' },
	{ label: 'Nom', key: 'lastname' },
	{ label: 'Licence', key: 'licence' },
	{ label: 'Email', key: 'email' },
	{ label: 'Tél', key: 'phone' },
	{ label: 'Réglement', key: 'hasPaid' },
	{ label: "Date d'inscription", key: 'createdAt' },
];
const headersAll = [
	{ label: 'Prénom', key: 'firstname' },
	{ label: 'Nom', key: 'lastname' },
	{ label: 'Licence', key: 'licence' },
	{ label: 'Tableaux', key: 'brackets' },
	{ label: 'Email', key: 'email' },
	{ label: 'Tél', key: 'phone' },
	{ label: 'Réglement', key: 'price' },
	{ label: "Date d'inscription", key: 'createdAt' },
];

interface TicketTypeWithCount extends TicketType {
	brackets: string;
}

const TicketTable = (): JSX.Element => {
	const location = useLocation();
	const {
		loading: loadingT,
		error: errorT,
		data: dataT,
	} = useQuery(TicketsQuery, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first',
	});
	const {
		loading: loadingB,
		error: errorB,
		data: dataB,
	} = useQuery(BracketsQuery, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first',
	});
	const [deleteTicket] = useMutation(DeleteTicket, {
		refetchQueries: [TicketsQuery],
	});

	const handleTicketDelete = async (id: string) => {
		if (window.confirm('Voulez-vous vraiment supprimer ce participant ?')) {
			await deleteTicket({ variables: { id } });
			toast.success('Participant supprimé avec succès', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};

	const ticketsByBracket = (tickets: TicketType[], bracket: BracketType): TicketType[] => {
		return tickets.filter((ticket) => ticket.bracket === bracket.letter);
	};

	const filteredTickets = (tickets: TicketType[]): TicketTypeWithCount[] => {
		const filteredTickets: TicketTypeWithCount[] = Object.values(
			tickets.reduce((p: any, v: TicketType) => {
				const old = p[v.licence];
				if (!old) {
					p[v.licence] = { ...v, brackets: v.bracket, price: v.hasPaid ? 0 : 8 };
				} else {
					p[v.licence].brackets += v.bracket;
					p[v.licence].price += v.hasPaid ? 0 : 8;
				}
				return p;
			}, {})
		);
		return filteredTickets.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		);
	};

	useEffect(() => {
		if (location.state) {
			toast.success(`${location.state}`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	}, [location.state]);

	return (
		<section className='space-y-16 bg-gray-200 px-4 py-32'>
			{(loadingB || loadingT) && <Loading />}
			{(errorB || errorT) && (
				<div className='flex h-96 w-full flex-col items-center justify-center text-center text-xl'>
					<span className='mr-1 font-bold'>Erreur :</span>
					{errorB && errorB.message}
					{errorT && errorT.message}
				</div>
			)}
			{dataB?.brackets && dataT?.tickets && (
				<>
					<div className='container mx-auto'>
						<h2 className='mb-6 lg:mb-12'>Liste des Participants</h2>
						<Tab.Group>
							<Tab.List className='flex flex-wrap justify-center pt-8 uppercase'>
								<Tab
									key='all'
									className={({ selected }) =>
										classNames(
											'text-sx mx-2 mb-2 cursor-pointer p-2 uppercase outline-none md:text-sm',
											selected ? 'bg-lightBlue text-white' : 'hover:bg-gray-200'
										)
									}
								>
									Global
								</Tab>
								{dataB.brackets.map((bracket: BracketType) => (
									<Tab
										key={bracket.id}
										className={({ selected }) =>
											classNames(
												'text-sx mx-2 mb-2 cursor-pointer p-2 uppercase outline-none md:text-sm',
												selected ? 'bg-lightBlue text-white' : 'hover:bg-gray-200'
											)
										}
									>
										Tableau {bracket.letter}
									</Tab>
								))}
							</Tab.List>
							<Tab.Panels>
								<Tab.Panel key='all'>
									<h3 className='mt-8 text-center text-2xl uppercase tracking-wide'>
										Tout les participants ({filteredTickets(dataT.tickets).length})
									</h3>
									<CSVLink
										data={filteredTickets(dataT.tickets)}
										headers={headersAll}
										filename={'Global-Tournoi-Olivet-2024.csv'}
										className='mb-4 inline-flex transform items-center rounded bg-lightBlue px-5 py-2 text-white transition duration-400 ease-in-out hover:-translate-y-1'
									>
										<DownloadIcon className='mr-2 h-5 w-5' />
										<span>Télécharger CSV</span>
									</CSVLink>
									<div className='flex flex-col'>
										<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
											<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
												<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
													<table className='min-w-full divide-y divide-gray-200'>
														<thead className='bg-gray-50'>
															<tr>
																{columnsAll.map((heading) => (
																	<th
																		key={heading}
																		scope='col'
																		className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
																	>
																		{heading}
																	</th>
																))}
															</tr>
														</thead>
														<tbody className='relative divide-y divide-gray-200 bg-white'>
															{filteredTickets(dataT.tickets).map(
																(ticket: TicketTypeWithCount, idx: number) => (
																	<tr key={ticket.id}>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																			{idx + 1}
																		</td>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
																			{ticket.firstname}
																			<span className='ml-1 uppercase'>{ticket.lastname}</span>
																		</td>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
																			{ticket.licence}
																		</td>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																			{ticket.brackets.length}
																		</td>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																			{ticket.email}
																		</td>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																			{ticket.phone}
																		</td>
																		<td className='whitespace-nowrap px-6 py-4'>
																			<span
																				className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
																					ticket.hasPaid
																						? 'bg-green-100 text-green-800'
																						: 'bg-red-100 text-red-800'
																				}`}
																			>
																				{ticket.hasPaid ? 'Payé' : 'À régler'}
																			</span>
																		</td>
																		<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																			{dayjs(ticket.createdAt).format('D MMM YYYY')}
																		</td>
																	</tr>
																)
															)}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</Tab.Panel>
								{dataB.brackets.map((bracket: BracketType) => (
									<Tab.Panel key={bracket.id}>
										<h3 className='mt-8 text-center text-2xl uppercase tracking-wide'>
											{bracket.name} ({ticketsByBracket(dataT.tickets, bracket).length}/
											{bracket.entries})
										</h3>
										<CSVLink
											data={ticketsByBracket(dataT.tickets, bracket)}
											headers={headers}
											filename={`Tableau-${bracket.letter}-Tournoi-Olivet-2024.csv`}
											className='mb-4 inline-flex transform items-center rounded bg-lightBlue px-5 py-2 text-white transition duration-400 ease-in-out hover:-translate-y-1'
										>
											<DownloadIcon className='mr-2 h-5 w-5' />
											<span>Télécharger CSV</span>
										</CSVLink>
										<div className='flex flex-col'>
											<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
												<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
													<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
														<table className='min-w-full divide-y divide-gray-200'>
															<thead className='bg-gray-50'>
																<tr>
																	{columns.map((heading) => (
																		<th
																			key={heading}
																			scope='col'
																			className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
																		>
																			{heading}
																		</th>
																	))}
																	<th scope='col' className='relative px-6 py-3'>
																		<span className='sr-only'>Modifier</span>
																	</th>
																</tr>
															</thead>
															<tbody className='relative divide-y divide-gray-200 bg-white'>
																{ticketsByBracket(dataT.tickets, bracket).map(
																	(ticket: TicketType, idx: number) => (
																		<tr key={ticket.id}>
																			<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																				{idx + 1}
																			</td>
																			<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
																				{ticket.firstname}
																				<span className='ml-1 uppercase'>{ticket.lastname}</span>
																			</td>
																			<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
																				{ticket.licence}
																			</td>
																			<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																				{ticket.email}
																			</td>
																			<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																				{ticket.phone}
																			</td>
																			<td className='whitespace-nowrap px-6 py-4'>
																				<span
																					className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
																						ticket.hasPaid
																							? 'bg-green-100 text-green-800'
																							: 'bg-red-100 text-red-800'
																					}`}
																				>
																					{ticket.hasPaid ? 'Payé' : 'À régler'}
																				</span>
																			</td>
																			<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
																				{dayjs(ticket.createdAt).format('D MMM YYYY')}
																			</td>
																			<td className='flex justify-evenly whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
																				<button
																					type='button'
																					title='Supprimer'
																					className='text-red-600 hover:text-red-900'
																					onClick={() => handleTicketDelete(ticket.id)}
																				>
																					<TrashIcon className='h-5 w-5' />
																				</button>
																			</td>
																		</tr>
																	)
																)}
															</tbody>
														</table>
													</div>
												</div>
											</div>
										</div>
									</Tab.Panel>
								))}
							</Tab.Panels>
						</Tab.Group>
					</div>
					<div className='container mx-auto'>
						<h2 className='mb-6 lg:mb-12'>Les Tableaux</h2>
						<div className='flex flex-col'>
							<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
								<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
									<div className='overflow-hidden border-b border-gray-200 shadow sm:rounded-lg'>
										<table className='min-w-full divide-y divide-gray-200'>
											<thead className='bg-gray-50'>
												<tr>
													{columns2.map((heading) => (
														<th
															key={heading}
															scope='col'
															className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500'
														>
															{heading}
														</th>
													))}
												</tr>
											</thead>
											<tbody className='relative divide-y divide-gray-200 bg-white'>
												{dataB?.brackets.map((bracket: BracketType) => (
													<tr key={bracket.id}>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
															{bracket.letter}
														</td>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
															{bracket.name}
														</td>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
															{ticketsByBracket(dataT.tickets, bracket).length}/{bracket.entries}
														</td>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
															{bracket.remainingEntries}
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
};

export default TicketTable;
