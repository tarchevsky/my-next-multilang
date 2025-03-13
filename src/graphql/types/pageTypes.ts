export interface Seo {
	metaDesc: string
	title: string
}

export interface Content {
	heroImage: {
		node: {
			id: string
			link: string
			altText?: string
		}
	}
	address?: string
	caption?: string
	consultingDescr?: string
	consultingSubtitle?: string
	consultingText?: string
	email?: string
	kopirajt?: string
	nazvanieKompanii?: string
	ourActivity?: string
	ourActivityMetodology?: string
	ourActivityTitle?: string
	ourClientsTitle?: string
	razrabotchik?: string
	sferaDeyatelnostiDbv?: string
	slogan?: string
	telefon?: string
	whatWeDo?: string
	consultingPoints?: {
		consultingPoint: string
	}
	ourActivityPoints: {
		number: number
		text: string
		img: {
			node: {
				link: string
			}
		}
	}
}

export interface RelatedPost {
	id: string
	slug: string
	title: string
}

export interface Options {
	underConstruction: boolean
	relatedPosts?: {
		edges: {
			node: RelatedPost
		}[]
	}
}

export interface Translation {
	translation: {
		seo: Seo
		title: string
		pagecontent: Content
		pagesOptions?: Options
	}
}

export interface PageData {
	page: Translation
}
