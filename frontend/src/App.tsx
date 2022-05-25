import React from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/organisms/Footer';
import Navbar from '@/components/organisms/Navbar';
import Page from '@/pages/Page';
import Sidebar from '@/components/organisms/Sidebar';
import 'react-toastify/dist/ReactToastify.min.css';

function App(): JSX.Element {
	const isAdmin = useLocation().pathname.startsWith('/admin');

	if (isAdmin)
		return (
			<div className='App'>
				<Sidebar />
				<main id='content' className='ml-64 min-h-screen bg-gray-100'>
					<Page />
					<ToastContainer />
				</main>
			</div>
		);

	return (
		<div className='App flex min-h-screen flex-col'>
			<Navbar />
			<main id='content' className='flex-1 overflow-hidden pt-20'>
				<Page />
			</main>
			<Footer />
		</div>
	);
}

export default App;
