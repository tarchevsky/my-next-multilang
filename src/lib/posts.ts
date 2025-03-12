import { GET_POSTS, GET_POSTS_BY_CATEGORIES } from '@/graphql/queries/getPosts'
import { PostProps, PostsData } from '@/graphql/types/postTypes'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export async function getPostsByCategory(
	client: ApolloClient<NormalizedCacheObject>,
	language: string,
	categoryId: number,
	locale: string
): Promise<PostProps[]> {
	const result = await client.query<PostsData>({
		query: GET_POSTS,
		variables: { language, categoryId },
	})

	return formatPosts(result.data, locale)
}

export async function getPostsByCategories(
	client: ApolloClient<NormalizedCacheObject>,
	language: string,
	categoryIds: string[],
	locale: string
): Promise<PostProps[]> {
	const result = await client.query<PostsData>({
		query: GET_POSTS_BY_CATEGORIES,
		variables: { language, categoryIn: categoryIds },
	})

	return formatPosts(result.data, locale)
}

function formatPosts(data: PostsData, locale: string): PostProps[] {
	if (!data?.posts?.edges?.length) {
		return []
	}

	return data.posts.edges.map(({ node }) => ({
		...node,
		path: `/${locale === 'ru' ? '' : locale + '/'}posts/${node.slug}`,
	}))
}
