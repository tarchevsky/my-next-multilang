export type LanguageCodeFilterEnum = 'en' | 'ru'

export interface PageProps {
	locale: LanguageCodeFilterEnum
	params: {
		slug: string
		locale?: string
	}
}
