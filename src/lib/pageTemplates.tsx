import UnderConstruction from '@/components/UnderConstruction/UnderConstruction'
import { Options } from '@/graphql/types/pageTypes'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import {
	generateLocaleParams,
	generateLocalizedMetadata,
	getLocalizedPageData,
} from './localization'

interface LocalePageProps {
	params: {
		locale: string
	}
}

export function createLocalizedPageTemplate(
	pageId: string,
	renderPage: (props: {
		pagecontent: any
		title: string
		locale: string
		pagesOptions?: Options
	}) => ReactNode
) {
	// Функция для генерации метаданных
	async function getMetadata(params: LocalePageProps): Promise<Metadata> {
		return generateLocalizedMetadata(pageId, params)
	}

	// Функция для генерации статических параметров
	function getStaticParams() {
		return generateLocaleParams()
	}

	// Компонент страницы
	async function Page({ params: { locale } }: LocalePageProps) {
		const pageData = await getLocalizedPageData(pageId, locale)
		console.log('Page data:', pageData)

		const { pagecontent, title, underConstruction, pagesOptions } = pageData
		// Проверка на строгое равенство с true
		const shouldShowUnderConstruction = underConstruction === true

		// Если страница в режиме "Under construction", показываем соответствующий компонент
		if (shouldShowUnderConstruction) {
			return <UnderConstruction locale={locale} />
		}

		// Иначе рендерим обычное содержимое страницы
		try {
			return renderPage({ pagecontent, title, locale, pagesOptions })
		} catch (error) {
			console.error(`Error rendering page ${pageId}:`, error)
			return (
				<div className='error-container'>
					<h1>
						{locale === 'ru'
							? 'Ошибка отображения страницы'
							: 'Error rendering page'}
					</h1>
					<p>
						{locale === 'ru'
							? 'Пожалуйста, попробуйте позже'
							: 'Please try again later'}
					</p>
				</div>
			)
		}
	}

	return {
		generateMetadata: getMetadata,
		generateStaticParams: getStaticParams,
		Page,
	}
}
