import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PartnersQuery } from '@/graphql/queries/partner';
import PartnerType from '@/types/Partner';
import getMediaUrl from '@/utils/mediaUrl';
import Loading from '@/components/atoms/Loading';

const Footer = (): JSX.Element => {
	const { loading, error, data } = useQuery(PartnersQuery);

	return (
		<footer className='bg-darkBlue'>
			<section id='partners' className='py-14'>
				<div className='container mx-auto'>
					<h2 className='mb-16 text-center text-white'>Nos Partenaires</h2>
					{loading && <Loading />}
					{error && (
						<div className='flex h-32 flex-col items-center justify-center text-center text-xl'>
							<span className='mr-1 font-bold'>Erreur :</span>
							{error.message}
						</div>
					)}
					<div className='flex-middle flex flex-wrap items-center justify-center'>
						{data?.partners?.map((partner: PartnerType) => (
							<Link className='p-8' to='/partenaires' key={partner.id}>
								<img
									className='logo-max align-middle opacity-60 brightness-100 invert filter transition hover:opacity-100'
									src={getMediaUrl(partner.media)}
									alt={partner.name}
								/>
							</Link>
						))}
					</div>
				</div>
			</section>
			<hr className='text-lightWhite' />
			<section id='copyright'>
				<p className='p-10 text-center text-gray-200 opacity-60'>
					&copy; {new Date().getFullYear()}, USM Olivet TT. Tous droits réservés.
					<Link className='ml-3 opacity-60 transition hover:opacity-100' to='/cgu'>
						Conditions d&apos;utilisation
					</Link>
				</p>
			</section>
		</footer>
	);
};

export default Footer;
