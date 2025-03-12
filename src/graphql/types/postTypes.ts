export interface PostNode {
	id: string
	title: string
	slug: string
	excerpt: string
}

export interface PostEdge {
	node: PostNode
}

export interface PostsData {
	posts: {
		edges: PostEdge[]
	}
}

export interface PostProps extends PostNode {
	path: string
}

export interface PostsListProps {
	posts: PostProps[]
	postsTitle: string
	readText?: string
}

export interface LanguageInfo {
	locale: string
	slug: string
}

export interface PostTranslation {
	id: string
	slug: string
	content: string
	title: string
	language: LanguageInfo
	seo?: {
		title: string
		metaDesc: string
	}
}

export interface Post {
	id: string
	date: string
	content: string
	title: string
	slug: string
	featuredImage?: {
		node: {
			link: string
			altText: string
		}
	}
	seo: {
		title: string
		metaDesc: string
	}
	translation?: PostTranslation
}

export interface SiteSettings {
	title: string
}
