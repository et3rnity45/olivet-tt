import React from 'react';
import HamMenu from '@/components/molecules/HamMenu';
import LeftNav from '@/components/molecules/LeftNav';
import RightNav from '@/components/molecules/RightNav';

const NavBar = (): JSX.Element => {
	return (
		<header className='fixed top-0 left-0 z-50 flex h-20 w-full items-center whitespace-nowrap bg-darkBlue text-white'>
			<nav className='mx-6 flex flex-grow items-center justify-between sm:mx-8'>
				<LeftNav />
				<RightNav />
				<HamMenu />
			</nav>
		</header>
	);
};

export default NavBar;
