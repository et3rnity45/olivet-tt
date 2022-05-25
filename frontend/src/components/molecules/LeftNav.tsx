import React from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo/olivet-tt.png';

const LeftNav = (): JSX.Element => {
	return (
		<Link className='flex items-center justify-center p-2' to='/'>
			<img className='mr-3 h-16' src={logo} alt='Olivet TT Logo' />
			<p className='text-2xl font-medium'>Olivet TT</p>
		</Link>
	);
};

export default LeftNav;
