import { gql } from '@apollo/client'

export const GET_PAGE = gql`
	query GetPage($language: LanguageCodeEnum!, $id: ID!) {
		page(id: $id) {
			translation(language: $language) {
				title
				pagecontent {
					address
					caption
					consultingDescr
					consultingSubtitle
					consultingText
					consultingTitle
					email
					kopirajt
					nazvanieKompanii
					ourActivity
					ourActivityMetodology
					ourActivityTitle
					ourClientsTitle
					razrabotchik
					sferaDeyatelnostiDbv
					slogan
					telefon
					whatWeDo
					consultingPoints {
						consultingPoint
					}
					heroImage {
						node {
							id
							link
							altText
						}
					}
					ourActivityPoints {
						number
						text
						img {
							node {
								link
							}
						}
					}
				}
				underConstruction {
					underConstruction
				}
				seo {
					metaDesc
					title
				}
			}
		}
	}
`
