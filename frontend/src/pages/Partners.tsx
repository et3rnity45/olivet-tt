import React from 'react';
import { useQuery } from '@apollo/client';
import PartnerType from '@/types/Partner';
import { PartnersQuery } from '@/graphql/queries/partner';
import getMediaUrl from '@/utils/mediaUrl';
import Loading from '@/components/atoms/Loading';

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
				{loading && <Loading />}
				{error && (
					<div className='flex h-96 flex-col items-center justify-center text-center text-xl'>
						<span className='mr-1 font-bold'>Erreur :</span>
						{error.message}
					</div>
				)}
				{data?.partners ? <div className='flex flex-wrap'>{partnerList}</div> : null}
			</div>
		</section>
	);
};

export default Partners;
