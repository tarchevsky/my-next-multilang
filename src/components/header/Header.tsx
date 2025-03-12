'use client'

import Burger from '@/components/burger/Burger'
import ThemeToggle from '@/components/themeToggle/ThemeToggle'
import { Locale, getMenuItems } from '@/constants/menu.constants'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LanguageToggle from '../languageToggle/LanguageToggle'
import styles from './Header.module.scss'

const Header = () => {
	const [isMenuActive, setIsMenuActive] = useState(false)
	const [currentLocale, setCurrentLocale] = useState<Locale>('ru')
	const pathname = usePathname()

	useEffect(() => {
		// Определяем текущую локаль из URL
		const locale = pathname.split('/')[1]
		if (locale === 'en' || locale === 'ru') {
			setCurrentLocale(locale as Locale)
		}
	}, [pathname])

	// Получаем пункты меню для текущей локали
	const menuItems = getMenuItems(currentLocale)

	// Функция для получения правильного пути с учетом локали
	const getLocalizedPath = (path: string) => {
		// Если текущая локаль - русская (дефолтная), не добавляем префикс
		if (currentLocale === 'ru') {
			return path
		}
		// Для других локалей добавляем префикс
		return `/${currentLocale}${path}`
	}

	const toggleMenu = () => {
		setIsMenuActive(!isMenuActive)
	}

	useEffect(() => {
		if (isMenuActive) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuActive])

	return (
		<header className='cont relative flex justify-between md:justify-between items-center py-4'>
			<Link href={getLocalizedPath('/')} className='z-20'>
				Logo
			</Link>
			<nav
				className={cn(
					{ [styles.active]: isMenuActive },
					'fixed md:static z-10 w-full h-full md:w-auto md:h-auto end-0 bottom-0 -translate-y-full md:translate-y-0 opacity-0 md:opacity-100 transition-all duration-300 ease-out'
				)}
			>
				<ul
					tabIndex={0}
					className='absolute md:static menu flex-nowrap gap-5 md:menu-horizontal start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-y-0 md:translate-x-0'
				>
					{menuItems.map((item, index) => (
						<li
							key={index}
							className={cn(
								styles.item,
								'block text-center opacity-0 md:opacity-100'
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href={getLocalizedPath(item.path)}
							>
								{item.label}
							</Link>
						</li>
					))}
					<li className='justify-center'>
						<LanguageToggle />
					</li>
					<li className='justify-center'>
						<ThemeToggle />
					</li>
				</ul>
			</nav>
			<Burger toggleMenu={toggleMenu} />
		</header>
	)
}

export default Header
