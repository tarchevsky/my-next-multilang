import { gql } from '@apollo/client'

export const GET_POST_BY_SLUG = gql`
	query PostBySlug($slug: String!, $language: LanguageCodeEnum!) {
		generalSettings {
			title
		}
		postBy(slug: $slug) {
			id
			content
			title
			slug
			date
			featuredImage {
				node {
					link
					altText
				}
			}
			seo {
				title
				metaDesc
			}
			translation(language: $language) {
				id
				slug
				content
				title
				seo {
					title
					metaDesc
				}
				language {
					locale
					slug
				}
			}
		}
	}
`
