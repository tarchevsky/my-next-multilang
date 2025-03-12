import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Metrika from '@/components/metrika/Metrika'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { SITE_NAME } from '@/constants/site.constants'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import '../globals.css'

const yId = process.env.NEXT_PUBLIC_YID // id яндекс метрики

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s`,
	},
}

// Валидация параметров локали
export function generateStaticParams() {
	return [{ locale: 'ru' }, { locale: 'en' }]
}

export default function LocaleLayout({
	children,
	params: { locale },
}: Readonly<{
	children: ReactNode
	params: { locale: string }
}>) {
	return (
		<html lang={locale}>
			<body>
				<Header />
				{children}
				<ScrollToTop />
				<Footer />
				{yId ? <Metrika yId={yId} /> : null}
			</body>
		</html>
	)
}
