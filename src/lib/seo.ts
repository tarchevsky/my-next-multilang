// src/lib/seo.ts
import { GET_PAGE } from '@/graphql/queries/getPage'
import { PageData } from '@/graphql/types/pageTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function fetchSeoMetadata(
	id: string,
	language: string = 'RU'
): Promise<{ title: string; description: string }> {
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

	try {
		const { data } = await apolloClient.query<PageData>({
			query: GET_PAGE,
			variables: { id, language: language.toUpperCase() },
		})

		// Используем опциональную цепочку для безопасного доступа к данным
		const seo = data?.page?.translation?.seo

		return {
			title: seo?.title || (language === 'RU' ? 'Главная' : 'Home'),
			description:
				seo?.metaDesc ||
				(language === 'RU' ? 'Описание сайта' : 'Site description'),
		}
	} catch (error) {
		console.error('Error fetching SEO metadata:', error)
		return {
			title: language === 'RU' ? 'Главная' : 'Home',
			description: language === 'RU' ? 'Описание сайта' : 'Site description',
		}
	}
}
