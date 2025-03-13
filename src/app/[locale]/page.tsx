import Hero from '@/components/hero/Hero'
import PostsList from '@/components/postsList/PostsList'
import RelatedPosts from '@/components/relatedPosts/RelatedPosts'
import { RelatedPost } from '@/graphql/types/pageTypes'
import { getApolloClient } from '@/lib/apollo-client'
import { createLocalizedPageTemplate } from '@/lib/pageTemplates'
import { getPostsByCategories } from '@/lib/posts'

// ID главной страницы в CMS
const HOME_PAGE_ID = 'cG9zdDoxMA=='

// ID категорий для разных языков
const CATEGORY_IDS = {
	ru: ['17'],
	en: ['19'],
}

// Создаем локализованную страницу с помощью шаблона
const { generateMetadata, generateStaticParams, Page } =
	createLocalizedPageTemplate(
		HOME_PAGE_ID,
		async ({ pagecontent, title, locale, pagesOptions }) => {
			const apolloClient = getApolloClient()
			const categoryIn = CATEGORY_IDS[locale as keyof typeof CATEGORY_IDS]

			const posts = await getPostsByCategories(
				apolloClient,
				locale === 'ru' ? 'RU' : 'EN',
				categoryIn,
				locale
			)

			const relatedPosts =
				pagesOptions?.relatedPosts?.edges.map(
					(edge: { node: RelatedPost }) => edge.node
				) || []

			console.log('pagesOptions:', pagesOptions)
			console.log('relatedPosts:', relatedPosts)

			return (
				<div className='cont'>
					<h1 className='text-4xl font-bold mb-6'>{title}</h1>

					{pagecontent.heroImage && (
						<Hero
							src={pagecontent.heroImage.node.link}
							alt={pagecontent.heroImage.node.altText}
						/>
					)}

					<div className='mt-16'>
						<PostsList
							postsTitle={locale === 'ru' ? 'Список постов' : 'Posts list'}
							posts={posts}
							readText={locale === 'ru' ? 'Читать статью' : 'Read article'}
						/>
					</div>

					{relatedPosts.length > 0 && (
						<RelatedPosts
							posts={relatedPosts}
							title={
								locale === 'ru' ? 'Рекомендуемые статьи' : 'Recommended posts'
							}
						/>
					)}
				</div>
			)
		}
	)

export { generateMetadata, generateStaticParams }
export default Page
