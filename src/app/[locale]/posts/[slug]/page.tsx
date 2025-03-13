import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import RelatedPosts from '@/components/relatedPosts/RelatedPosts'
import { GET_ALL_POST_SLUGS } from '@/graphql/queries/getAllPostSlugs'
import { GET_POST_BY_SLUG } from '@/graphql/queries/getPostBySlug'
import { LanguageCodeFilterEnum } from '@/graphql/types/commonTypes'
import { RelatedPost } from '@/graphql/types/pageTypes'
import { Post, SiteSettings } from '@/graphql/types/postTypes'
import { getApolloClient } from '@/lib/apollo-client'

// Генерация метаданных для страницы
export async function generateMetadata({
	params,
}: {
	params: {
		slug: string
		locale: string
	}
}): Promise<Metadata> {
	const { slug, locale } = params
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

	// Выполнение запроса к GraphQL API
	const { data } = await apolloClient.query({
		query: GET_POST_BY_SLUG,
		variables: {
			slug,
			language: (locale as string).toUpperCase() as LanguageCodeFilterEnum,
		},
	})

	const post: Post | null = data?.postBy
	const site: SiteSettings = data?.generalSettings

	// Если пост не найден, возвращаем базовые метаданные
	if (!post) {
		return {
			title: site?.title || 'Пост не найден',
			description: 'Запрашиваемый пост не найден',
		}
	}

	// Используем данные перевода, если они доступны
	const postData = post.translation || post

	return {
		title: postData.seo?.title || postData.title,
		description: postData.seo?.metaDesc || '',
	}
}

interface LocalePostPageProps {
	params: {
		slug: string
		locale: string
	}
}

const PostPage = async ({ params }: LocalePostPageProps) => {
	const { slug, locale } = params
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

	// Выполнение запроса к GraphQL API
	const { data } = await apolloClient.query({
		query: GET_POST_BY_SLUG,
		variables: {
			slug,
			language: (locale as string).toUpperCase() as LanguageCodeFilterEnum,
		},
	})

	const post: Post | null = data?.postBy
	const site: SiteSettings = data?.generalSettings

	// Обработка случая, когда пост не найден
	if (!post) {
		notFound()
	}

	// Используем данные перевода, если они доступны
	const postData = post.translation || post

	// Функция для форматирования даты
	const formatDate = (dateString: string): string => {
		const date = new Date(dateString)
		const day = String(date.getDate()).padStart(2, '0')
		const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
		const year = date.getFullYear()
		return `${day}.${month}.${year}`
	}

	// Текст для кнопки "Назад" в зависимости от языка
	const backText = locale === 'ru' ? 'Назад' : 'Back'
	const categoryText = locale === 'ru' ? 'Рубрика' : 'Category'
	const dateText = locale === 'ru' ? 'Дата' : 'Date'
	const blogText = locale === 'ru' ? 'Блог' : 'Blog'

	const relatedPosts =
		postData.pagesOptions?.relatedPosts?.edges.map(
			(edge: { node: RelatedPost }) => edge.node
		) || []

	return (
		<div>
			<div className='cont'>
				<main>
					{post.featuredImage ? (
						<>
							<img
								src={post.featuredImage.node.link}
								alt={post.featuredImage.node.altText}
								className='h-[90svh] w-full object-cover brightness-50'
							/>
							<div className='flex flex-col'>
								<h1>{postData.title}</h1>
								<div>
									{dateText}: <span>{formatDate(post.date)}</span>
								</div>
								<div>
									{categoryText}: <span>{blogText}</span>
								</div>
							</div>
							<Link href={`/${locale === 'ru' ? '' : locale}`}>
								&lt; {backText}
							</Link>
						</>
					) : (
						<>
							<div className='flex flex-col'>
								<h1>{postData.title}</h1>
								<div>
									{dateText}: <span>{formatDate(post.date)}</span>
								</div>
								<div>
									{categoryText}: <span>{blogText}</span>
								</div>
							</div>
							<Link href={`/${locale === 'ru' ? '' : locale}`}>
								&lt; {backText}
							</Link>
						</>
					)}
				</main>
				<RelatedPosts
					posts={relatedPosts}
					title={locale === 'ru' ? 'Связанные статьи' : 'Related posts'}
				/>
			</div>
			<div className='px-[16px]'>
				<section className='prose m-auto'>
					<div
						dangerouslySetInnerHTML={{
							__html: postData.content,
						}}
					/>
				</section>
			</div>
		</div>
	)
}

export default PostPage

// Генерация статических маршрутов
export async function generateStaticParams() {
	const apolloClient: ApolloClient<NormalizedCacheObject> = getApolloClient()

	const { data } = await apolloClient.query({
		query: GET_ALL_POST_SLUGS,
	})

	// Создаем комбинации локалей и слагов
	const params = []
	const locales = ['ru', 'en']

	for (const locale of locales) {
		for (const post of data.posts.nodes) {
			params.push({
				locale,
				slug: post.slug,
			})
		}
	}

	return params
}
