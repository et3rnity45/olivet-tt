import React from 'react';
import ReactDOM from 'react-dom/client';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BrowserRouter } from 'react-router-dom';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ScrollToTop from '@/components/utils/ScrollToTop';
import App from './App';
import './index.css';

dayjs.locale('fr');
dayjs.extend(relativeTime);

const uploadLink = createUploadLink({
	uri: import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('token');
	return {
		headers: {
			...headers,
			'Apollo-Require-Preflight': true,
			'Authorization': token ? `Bearer ${token}` : '',
		},
	};
});

export const client = new ApolloClient({
	link: authLink.concat(uploadLink),
	cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<ScrollToTop />
				<App />
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);
