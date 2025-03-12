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
		const { pagecontent, title } = pageData

		return renderPage({ pagecontent, title, locale })
	}

	return {
		generateMetadata: getMetadata,
		generateStaticParams: getStaticParams,
		Page,
	}
}
