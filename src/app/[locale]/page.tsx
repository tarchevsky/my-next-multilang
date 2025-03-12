import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'

import { getApolloClient } from '@/lib/apollo-client'
import { getPostsByCategories } from '@/lib/posts'
import { fetchSeoMetadata } from '@/lib/seo'

import Hero from '@/components/hero/Hero'
import PostsList from '@/components/postsList/PostsList'
import { GET_PAGE } from '@/graphql/queries/getPage'
import { PageData } from '@/graphql/types/pageTypes'

interface LocalePageProps {
	params: {
		locale: string
	}
}

export async function generateMetadata({
	params: { locale },
}: LocalePageProps): Promise<Metadata> {
	const pageId = 'cG9zdDoxMA==' // Замените на соответствующий ID для главной страницы
	// Преобразуем locale в формат LanguageCodeEnum
	const language = locale === 'ru' ? 'RU' : 'EN'
	const seo = await fetchSeoMetadata(pageId, language)

	return {
		title: seo.title,
		description: seo.description,
	}
}

export async function generateStaticParams() {
	return [{ locale: 'ru' }, { locale: 'en' }]
}

const HomePage = async ({ params: { locale } }: LocalePageProps) => {
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

	const pageId = 'cG9zdDoxMA==' // ID твоей главной страницы
	// Преобразуем locale в формат LanguageCodeEnum
	const language = locale === 'ru' ? 'RU' : 'EN'

	// ID категорий для разных языков (в формате строк для GraphQL)
	const categoryIds = {
		ru: ['17'], // Можно указать несколько категорий для русского языка
		en: ['19'], // Можно указать несколько категорий для английского языка
	}

	// Получаем массив ID категорий для текущего языка
	const categoryIn = categoryIds[locale as keyof typeof categoryIds]

	// Параллельное выполнение запросов
	const [pageResult, posts] = await Promise.all([
		apolloClient.query<PageData>({
			query: GET_PAGE,
			variables: { id: pageId, language },
		}),
		getPostsByCategories(apolloClient, language, categoryIn, locale),
	])

	// Получаем данные страницы, если они есть
	const page = pageResult.data.page.translation.pagecontent
	const title = pageResult.data.page.translation.title

	return (
		<div className='cont'>
			<h1>{title}</h1>

			<Hero src={page.heroImage.node.link} alt={page.heroImage.node.altText} />

			<PostsList
				postsTitle={locale === 'ru' ? 'Список постов' : 'Posts list'}
				posts={posts}
				readText={locale === 'ru' ? 'Читать статью' : 'Read article'}
			/>
		</div>
	)
}

export default HomePage
