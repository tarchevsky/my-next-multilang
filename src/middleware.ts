import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ru']
const defaultLocale = 'ru'

export function middleware(request: NextRequest) {
	// Получаем путь из URL
	const pathname = request.nextUrl.pathname

	// Проверяем, содержит ли путь уже локаль
	const pathnameHasLocale = locales.some(
		locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)

	// Если путь уже содержит локаль, ничего не делаем
	if (pathnameHasLocale) return

	// Получаем предпочтительную локаль из заголовка Accept-Language
	// или используем локаль из cookie, если она есть
	const locale =
		request.cookies.get('NEXT_LOCALE')?.value ||
		request.headers.get('Accept-Language')?.split(',')[0].split('-')[0] ||
		defaultLocale

	// Проверяем, поддерживается ли локаль
	const finalLocale = locales.includes(locale) ? locale : defaultLocale

	// Если локаль - дефолтная (русская), не добавляем префикс в URL, но внутренне используем правильный путь
	if (finalLocale === defaultLocale) {
		// Для дефолтной локали не меняем URL, но внутренне используем правильный путь
		return NextResponse.rewrite(
			new URL(
				`/${defaultLocale}${pathname === '/' ? '' : pathname}`,
				request.url
			)
		)
	}

	// Для других локалей перенаправляем на путь с локалью
	return NextResponse.redirect(
		new URL(`/${finalLocale}${pathname === '/' ? '' : pathname}`, request.url)
	)
}

export const config = {
	// Применяем middleware только к этим путям
	matcher: [
		// Исключаем все пути, которые не должны быть перенаправлены
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
