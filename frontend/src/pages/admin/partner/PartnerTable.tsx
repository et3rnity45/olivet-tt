import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import { NavLink, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { PencilIcon, PlusIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline';
import PartnerType from '@/types/Partner';
import { PartnersQuery } from '@/graphql/queries/partner';
import { DeletePartner } from '@/graphql/mutations/partner';

const columns = ['#', 'Nom', 'Lien', 'Mise à jour', 'Date de création'];

const PartnerTable = (): JSX.Element => {
	const location = useLocation();
	const { loading, error, data } = useQuery(PartnersQuery, {
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first',
	});
	const [deletePartner] = useMutation(DeletePartner, {
		refetchQueries: [PartnersQuery],
	});

	const handleDelete = async (id: string) => {
		if (window.confirm('Voulez-vous vraiment supprimer ce partenaire ?')) {
			await deletePartner({ variables: { id } });
			toast.success('Partenaire supprimé avec succès', {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	};

	useEffect(() => {
		if (location.state) {
			toast.success(`${location.state}`, {
				position: toast.POSITION.BOTTOM_RIGHT,
			});
		}
	}, [location.state]);

	return (
		<section className='mx-4 py-16'>
			<div className='container mx-auto'>
				<h2 className='mb-6 lg:mb-12'>Liste des Partenaires</h2>
				{loading && (
					<div className='flex h-96 items-center justify-center'>
						<RefreshIcon className='h-20 w-20 rotate-180 transform animate-spin' />
					</div>
				)}
				{error && (
					<div className='flex h-96 w-full flex-col items-center justify-center text-center text-xl'>
						<span className='mr-1 font-bold'>Erreur :</span>
						{error.message}
					</div>
				)}
				{data?.partners && (
					<>
						<NavLink
							to={`${location.pathname}/create`}
							className='mb-4 inline-flex transform items-center rounded bg-lightBlue px-5 py-2 text-white transition duration-400 ease-in-out hover:-translate-y-1'
						>
							<PlusIcon className='mr-2 h-5 w-5' />
							<span>Ajouter un partenaire</span>
						</NavLink>
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
												{data?.partners.map((partner: PartnerType, idx: number) => (
													<tr key={partner.id}>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
															{idx + 1}
														</td>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-900'>
															{partner.name}
														</td>
														<td className='whitespace-nowrap px-6 py-4'>
															<a
																href={partner.url}
																target='_blank'
																className='inline-flex rounded-full bg-red-100 px-2 text-xs font-semibold leading-5 text-red-800'
																rel='noreferrer'
															>
																{partner.url}
															</a>
														</td>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
															{dayjs(partner.updatedAt).fromNow()}
														</td>
														<td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
															{dayjs(partner.createdAt).format('D MMM YYYY')}
														</td>
														<td className='flex justify-evenly whitespace-nowrap px-6 py-4 text-right text-sm font-medium'>
															<NavLink
																to={`${location.pathname}/edit/${partner.id}`}
																className='text-indigo-600 hover:text-indigo-900'
															>
																<PencilIcon className='relative h-5 w-5' />
															</NavLink>
															<button
																type='button'
																className='text-red-600 hover:text-red-900'
																onClick={() => handleDelete(partner.id)}
															>
																<TrashIcon className='h-5 w-5' />
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</section>
	);
};

export default PartnerTable;
