'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const LanguageToggle = () => {
	const router = useRouter()
	const pathname = usePathname()
	const [currentLocale, setCurrentLocale] = useState<string>('ru')

	useEffect(() => {
		// Определяем текущую локаль из URL
		const locale = pathname.split('/')[1]
		if (locale === 'en' || locale === 'ru') {
			setCurrentLocale(locale)
		}
	}, [pathname])

	const toggleLanguage = () => {
		// Переключаем между русским и английским
		const newLocale = currentLocale === 'ru' ? 'en' : 'ru'
		setCurrentLocale(newLocale)

		// Сохраняем выбор пользователя в localStorage
		if (typeof window !== 'undefined') {
			localStorage.setItem('NEXT_LOCALE', newLocale)
		}

		// Перенаправляем на ту же страницу, но с новой локалью
		const pathSegments = pathname.split('/')
		if (pathSegments[1] === 'en' || pathSegments[1] === 'ru') {
			pathSegments[1] = newLocale
		} else {
			pathSegments.splice(1, 0, newLocale)
		}

		router.push(pathSegments.join('/'))
	}

	return (
		<button
			onClick={toggleLanguage}
			className='btn btn-ghost font-normal flex items-center justify-center'
			aria-label='Toggle language'
		>
			{currentLocale === 'ru' ? 'En' : 'Ru'}
		</button>
	)
}

export default LanguageToggle
