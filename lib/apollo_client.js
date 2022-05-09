import fetch from 'cross-fetch';
const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client/core');

// initialise apollo client 
const GRAPH_QL_URL = 'https://carrybags-shared-data-dummy.herokuapp.com/graphql';

export const apollo_client = new ApolloClient({
	link: new HttpLink({
		uri: GRAPH_QL_URL,
		fetch
	}),
	cache: new InMemoryCache(),
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'no-cache',
		},
		query: {
			fetchPolicy: 'no-cache',
		},
	}
});

