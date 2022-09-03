import React from 'react';
import { useQuery } from '@apollo/client';
import { RefreshIcon } from '@heroicons/react/outline';
import { TrainersQuery } from '@/graphql/queries/trainer';
import TrainerType from '@/types/Trainer';
import planning from '@/assets/background/planning-2022.png';
import getMediaUrl from '@/utils/mediaUrl';

const Training = (): JSX.Element => {
	const { loading, error, data } = useQuery(TrainersQuery);

	const trainerList = data?.trainers?.map((trainer: TrainerType) => (
		<div
			key={trainer.id}
			className='trainer-card mx-4 mb-8 flex flex-1 flex-col rounded bg-white shadow-2xl'
		>
			<img
				className='h-auto rounded-t'
				src={getMediaUrl(trainer.media)}
				alt={`${trainer.firstname} ${trainer.lastname}`}
			/>
			<div className='p-10'>
				<h3 className='mb-3 text-xl'>{`${trainer.firstname} ${trainer.lastname}`}</h3>
				<p className='mb-1 text-xs font-light uppercase text-lightRed'>Qualification</p>
				<p className='text-gray text-sm tracking-wider'>{trainer.qualification}</p>
			</div>
		</div>
	));

	return (
		<>
			<section className='py-16' id='planning'>
				<div className='container mx-auto px-3'>
					<h2 className='mb-8 lg:mb-16'>Planning des entraînements</h2>
					<img className='mx-auto' src={planning} alt='Planning des entraînements' />
				</div>
			</section>
			<section className='py-16' id='entraineur'>
				<div className='container mx-auto px-3'>
					<h2 className='mb-8 lg:mb-16'>Nos Entraîneurs</h2>
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
					<div className='flex flex-col items-center justify-evenly md:flex-row md:items-stretch'>
						{data?.trainers ? <>{trainerList}</> : null}
					</div>
				</div>
			</section>
		</>
	);
};

export default Training;
