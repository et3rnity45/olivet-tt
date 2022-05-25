import React from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/outline';
import { ReactComponent as Facebook } from '@/assets/icons/facebook.svg';
import { ReactComponent as Youtube } from '@/assets/icons/youtube.svg';

const coordinates = {
	mail: 'olivet-tt@orange.fr',
	phone: '02 38 66 86 88',
	room: "Gymnase de l'Orbellière",
	address: '199 Rue des Cireries',
	city: '45160 Olivet',
	facebook: 'https://www.facebook.com/usmolivetennisdetable/',
	youtube: '#',
};

const trainers = [
	{
		name: 'Guillaume le Guigner',
	},
	{
		name: 'Antoine Biston',
	},
];

const Contact = (): JSX.Element => {
	return (
		<section className='mx-4 py-8 lg:py-16' id='contact'>
			<div className='container mx-auto'>
				<h2 className='mb-6 lg:mb-12'>Nos Coordonnées</h2>
				<div className='flex flex-col lg:flex-row'>
					<div className='aspect-w-16 aspect-h-9 mb-12 w-full lg:aspect-w-5 lg:aspect-h-2 lg:mr-12 lg:w-2/3'>
						<iframe
							title="Gymnas de l'Orbellière"
							className='w-full'
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1125.2036627424613!2d1.895075432075643!3d47.87444711107034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e4e50259a13ab1%3A0x2feea0fcfcb1ed4e!2sGymnase%20de%20l'Orbelli%C3%A8re!5e0!3m2!1sfr!2sfr!4v1587990255041!5m2!1sfr!2sfr"
							allowFullScreen
							aria-hidden='false'
							frameBorder='0'
						/>
					</div>
					<div className='w-full lg:w-1/3'>
						<h3 className='mb-5 text-lg font-medium'>La Salle</h3>
						<p className='font-light'>
							<span>{coordinates.room}</span>
							<br />
							<span>{coordinates.address}</span>
							<br />
							<span>{coordinates.city}</span>
						</p>
						<h3 className='mb-5 mt-10 text-lg font-medium'>Les Entraîneurs</h3>
						<div className='font-light'>
							{trainers.map((trainer) => (
								<p key={trainer.name}>{trainer.name}</p>
							))}
						</div>
						<h3 className='mb-5 mt-10 text-lg font-medium'>Contact</h3>
						<div className='font-light'>
							<div>
								<MailIcon height='20' className='text-gray mr-2 inline-block' />
								<a
									className='border-b border-lightRed hover:text-lightRed'
									href={`mailto:${coordinates.mail}`}
								>
									{coordinates.mail}
								</a>
							</div>
							<div>
								<PhoneIcon height='20' className='text-gray mr-2 inline-block' />
								<span>{coordinates.phone}</span>
							</div>
						</div>
						<h3 className='mb-5 mt-10 text-lg font-medium'>Réseaux Sociaux</h3>
						<ul className='flex'>
							<li className='mr-3'>
								<a href={coordinates.facebook} target='_blank' rel='noreferrer'>
									<Facebook height='24' width='24' className='text-gray hover:text-lightRed' />
								</a>
							</li>
							<li className='mr-3'>
								<a href={coordinates.youtube} target='_blank' rel='noreferrer'>
									<Youtube height='24' width='24' className='text-gray hover:text-lightRed' />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
