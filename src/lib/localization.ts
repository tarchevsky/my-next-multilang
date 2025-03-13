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

		// Проверяем, есть ли поле underConstruction и его значение
		// Преобразуем значение в булевое, чтобы избежать проблем с типами
		let isUnderConstruction = false

		try {
			// Получаем значение underConstruction
			const underConstructionData = data.page.translation.underConstruction

			// Если данные есть, пытаемся получить значение
			if (
				underConstructionData &&
				underConstructionData.underConstruction !== undefined
			) {
				// Преобразуем в булевое значение в зависимости от типа
				if (typeof underConstructionData.underConstruction === 'boolean') {
					isUnderConstruction = underConstructionData.underConstruction
				} else if (
					typeof underConstructionData.underConstruction === 'string'
				) {
					isUnderConstruction =
						underConstructionData.underConstruction === 'true'
				} else {
					// Для других типов преобразуем в булевое
					isUnderConstruction = Boolean(underConstructionData.underConstruction)
				}
			}
		} catch (e) {
			console.error('Error processing underConstruction data:', e)
		}

		// Создаем результат
		const result = {
			pagecontent: data.page.translation.pagecontent,
			title: data.page.translation.title,
			underConstruction: isUnderConstruction,
		}

		return result
	} catch (error) {
		console.error('Error fetching page data:', error)
		return {
			pagecontent: null,
			title: locale === 'ru' ? 'Ошибка загрузки' : 'Loading Error',
			underConstruction: false,
		}
	}
}
