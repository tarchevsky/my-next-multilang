import { GET_PAGE } from '@/graphql/queries/getPage'
import { PageData } from '@/graphql/types/pageTypes'
import { Metadata } from 'next'
import { getApolloClient } from './apollo-client'
import { fetchSeoMetadata } from './seo'

interface LocaleParams {
	params: {
		locale: string
	}
}

export async function generateLocalizedMetadata(
	pageId: string,
	{ params: { locale } }: LocaleParams
): Promise<Metadata> {
	// Преобразуем locale в формат LanguageCodeEnum
	const language = locale === 'ru' ? 'RU' : 'EN'
	const seo = await fetchSeoMetadata(pageId, language)

	return {
		title: seo.title,
		description: seo.description,
	}
}

export function localeToLanguageCode(locale: string): string {
	return locale === 'ru' ? 'RU' : 'EN'
}

export function generateLocaleParams() {
	return [{ locale: 'ru' }, { locale: 'en' }]
}

export async function getLocalizedPageData(pageId: string, locale: string) {
	const apolloClient = getApolloClient()
	const language = localeToLanguageCode(locale)

	try {
		const { data } = await apolloClient.query<PageData>({
			query: GET_PAGE,
			variables: { id: pageId, language },
		})

		return {
			pagecontent: data.page.translation.pagecontent,
			title: data.page.translation.title,
		}
	} catch (error) {
		console.error('Error fetching page data:', error)
		return {
			pagecontent: null,
			title: locale === 'ru' ? 'Ошибка загрузки' : 'Loading Error',
		}
	}
}
