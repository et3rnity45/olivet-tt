import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Gym } from '@/assets/icons/gym.svg';
import { ReactComponent as PingPong } from '@/assets/icons/ping-pong.svg';
import { ReactComponent as Trophy } from '@/assets/icons/trophy.svg';

export const activities = [
	{
		name: 'Entraînements',
		link: '/sportif/entrainements',
		svg: <Gym height='60' width='60' className='fill-current' />,
		description:
			"Renseignez vous sur les différents créneaux d'entraînements mis à votre disposition par le club",
	},
	{
		name: 'Stages',
		link: '/articles/stage',
		svg: <PingPong height='60' width='60' className='fill-current' />,
		description:
			'Découvrez les stages proposés par le club pour occuper les enfants durant les vacances',
	},
	{
		name: 'Compétitions',
		link: '/articles/competition',
		svg: <Trophy height='60' width='60' className='fill-current' />,
		description:
			'Consultez les annonces et les résultats des différentes compétitions auxquelles le club participe',
	},
];

const Discover = (): JSX.Element => {
	return (
		<section className='py-16' id='discover'>
			<div className='container mx-auto'>
				<div className='flex flex-col lg:flex-row'>
					{activities.map((activity) => {
						return (
							<Link
								className='mx-4 flex flex-1 flex-col items-center rounded-lg p-10 transition-all duration-400 hover:text-lightRed hover:shadow-2xl focus:text-lightRed focus:shadow-md'
								to={activity.link}
								key={activity.name}
							>
								{activity.svg}
								<h3 className='mt-5 text-xl uppercase text-black'>{activity.name}</h3>
								<p className='mt-5 text-center font-extralight text-black'>
									{activity.description}
								</p>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Discover;
