import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	HomeIcon,
	UserIcon,
	NewspaperIcon,
	UserGroupIcon,
	UsersIcon,
	ChartBarIcon,
	ShareIcon,
	TableIcon,
} from '@heroicons/react/outline';
import logo from '@/assets/logo/olivet-tt.png';

const navigation = [
	// { name: 'Tableau de Bord', href: '/admin', icon: HomeIcon },
	// { name: 'Utilisateurs', href: '/admin/users', icon: UserIcon },
	// { name: 'Articles', href: '/admin/articles', icon: NewspaperIcon },
	// { name: 'Partenaires', href: '/admin/partners', icon: ShareIcon },
	// { name: 'Entraineurs', href: '/admin/trainers', icon: UsersIcon },
	// { name: 'Classement', href: '/admin/players', icon: ChartBarIcon },
	// { name: 'équipes', href: '/admin/teams', icon: UserGroupIcon },
	{ name: 'Tournoi', href: '/admin', icon: TableIcon },
];

const Sidebar = (): JSX.Element => {
	return (
		<div className='fixed top-0 bottom-0 left-0 z-50 w-64 bg-lightBlue bg-opacity-95 text-white shadow-2xl'>
			<NavLink to={'/'} className='mt-4 mb-6 flex flex-col items-center px-6'>
				<img className='h-auto w-16' src={logo} alt='Logo USM Olivet TT' />
				<h3 className='mt-4 text-xl font-semibold'>USM Olivet TT</h3>
			</NavLink>
			<nav className='flex-grow border-t border-lightWhite border-opacity-10 p-3'>
				<ul>
					{navigation.map((item) => (
						<li key={item.name}>
							<NavLink
								to={item.href}
								end
								className={(navData) =>
									`duration-50 mt-1 inline-flex w-full items-end rounded p-2 transition ease-in-out hover:bg-lightBlue ${
										navData.isActive ? 'text-lightRed' : ''
									}`
								}
							>
								<item.icon className='mr-2 h-6 w-6' aria-hidden='true' />
								<span className='text-sm capitalize text-white'>{item.name}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Sidebar;
