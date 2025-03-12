import { gql } from '@apollo/client'

export const GET_POSTS = gql`
	query PostsContents($language: LanguageCodeFilterEnum!, $categoryId: Int!) {
		posts(where: { categoryId: $categoryId, language: $language }) {
			edges {
				node {
					id
					title
					slug
					excerpt
				}
			}
		}
	}
`

// Запрос для получения постов из нескольких категорий
export const GET_POSTS_BY_CATEGORIES = gql`
	query PostsContentsByCategories(
		$language: LanguageCodeFilterEnum!
		$categoryIn: [ID]
	) {
		posts(where: { categoryIn: $categoryIn, language: $language }) {
			edges {
				node {
					id
					title
					slug
					excerpt
				}
			}
		}
	}
`
