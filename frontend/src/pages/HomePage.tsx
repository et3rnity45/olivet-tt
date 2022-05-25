import React from 'react';
import Discover from '@/components/organisms/Discover';
import News from '@/components/organisms/News';
import Hero from '@/components/organisms/Hero';

const HomePage = (): JSX.Element => {
	return (
		<>
			<Hero />
			<News />
			<Discover />
		</>
	);
};

export default HomePage;
