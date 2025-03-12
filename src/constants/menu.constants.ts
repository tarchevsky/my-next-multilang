export const menuPoints = {
	menu: {
		ru: {
			items: [
				{ path: '/', key: 'home', label: 'Главная' },
				{ path: '/about', key: 'about', label: 'О нас' },
				{ path: '/contacts', key: 'contacts', label: 'Контакты' },
			],
		},
		en: {
			items: [
				{ path: '/', key: 'home', label: 'Home' },
				{ path: '/about', key: 'about', label: 'About' },
				{ path: '/contacts', key: 'contacts', label: 'Contacts' },
			],
		},
	},
}

export type Locale = 'ru' | 'en'
export type MenuKey = 'home' | 'about' | 'contacts'

export interface MenuItem {
	path: string
	key: MenuKey
	label: string
}

// Упрощенная функция получения элементов меню
export const getMenuItems = (locale: Locale) => menuPoints.menu[locale].items

// Более компактная функция получения перевода
export const getMenuTranslation = (locale: Locale, key: MenuKey) =>
	menuPoints.menu[locale].items.find(item => item.key === key)?.label || key
