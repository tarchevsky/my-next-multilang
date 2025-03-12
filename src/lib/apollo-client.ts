// lib/apollo-client.ts

import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

// Обработчик ошибок
const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		)
	if (networkError) console.error(`[Network error]: ${networkError}`)
})

// HTTP-ссылка
const httpLink = new HttpLink({
	uri: process.env.WORDPRESS_GRAPHQL_ENDPOINT,
})

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	link: from([errorLink, httpLink]),
	cache: new InMemoryCache(),
	defaultOptions: {
		query: {
			fetchPolicy: 'network-only', // Отключаем кеширование для отладки
			errorPolicy: 'all',
		},
	},
})

export const getApolloClient = () => client
