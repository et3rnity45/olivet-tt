import React from 'react';
import { useQuery } from '@apollo/client';
import { RefreshIcon } from '@heroicons/react/outline';
import PartnerType from '@/types/Partner';
import { PartnersQuery } from '@/graphql/queries/partner';
import getMediaUrl from '@/utils/mediaUrl';

const Partners = (): JSX.Element => {
	const { loading, error, data } = useQuery(PartnersQuery);

	const partnerList = data?.partners?.map((partner: PartnerType) => (
		<a
			key={partner.id}
			href={partner.url}
			target='_blank'
			rel='noreferrer'
			className='partner-item'
		>
			<img className='partner-logo' src={getMediaUrl(partner.media)} alt={`Logo ${partner.name}`} />
		</a>
	));

	return (
		<section className='mx-4 py-16' id='partners'>
			<div className='container mx-auto'>
				<h2 className='mb-6 lg:mb-12'>Nos Partenaires</h2>
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
				{data?.partners ? <div className='flex flex-wrap'>{partnerList}</div> : null}
			</div>
		</section>
	);
};

export default Partners;
