# Локализация страниц

В этом документе описано, как быстро создавать локализованные страницы в проекте.

## Шаблон локализованной страницы

Для упрощения создания локализованных страниц мы разработали шаблон, который автоматически обрабатывает:

- Получение данных из CMS в зависимости от выбранного языка
- Генерацию метаданных для SEO
- Генерацию статических параметров для предварительного рендеринга

## Как использовать шаблон

### 1. Создайте новый файл страницы

Создайте файл `page.tsx` в соответствующей директории, например:

```
src/app/[locale]/your-page/page.tsx
```

### 2. Используйте шаблон для создания страницы

```tsx
import Htag from '@/components/Htag/Htag'
import { createLocalizedPageTemplate } from '@/lib/pageTemplates'

// ID страницы в CMS
const PAGE_ID = 'your-page-id-from-cms'

// Создаем локализованную страницу с помощью шаблона
const { generateMetadata, generateStaticParams, Page } =
	createLocalizedPageTemplate(PAGE_ID, ({ pagecontent, title, locale }) => (
		<div className='cont'>
			<Htag tag='h1'>{title}</Htag>
			{pagecontent && (
				<div className='your-page-content'>
					{/* Используйте данные из pagecontent */}
					{pagecontent.someField && <p>{pagecontent.someField}</p>}

					{/* Локализованные строки */}
					<p>{locale === 'ru' ? 'Русский текст' : 'English text'}</p>
				</div>
			)}
		</div>
	))

export { generateMetadata, generateStaticParams }
export default Page
```

### 3. Добавьте ID страницы в CMS

Убедитесь, что у вас есть соответствующая страница в CMS с указанным ID. ID страницы можно получить из URL в админке CMS или через API.

## Доступные поля в pagecontent

В зависимости от структуры данных в CMS, в `pagecontent` могут быть доступны следующие поля:

- `address` - адрес
- `telefon` - телефон
- `email` - электронная почта
- `whatWeDo` - чем мы занимаемся
- `ourActivity` - наша деятельность
- `heroImage` - главное изображение страницы
- и другие поля, определенные в CMS

## Пример использования изображения

```tsx
{
	pagecontent.heroImage && (
		<img
			src={pagecontent.heroImage.node.link}
			alt={pagecontent.heroImage.node.altText || title}
			className='hero-image'
		/>
	)
}
```

## Локализация строк

Для локализации строк используйте условный оператор с проверкой текущей локали:

```tsx
{
	locale === 'ru' ? 'Русский текст' : 'English text'
}
```

## Добавление новых полей в CMS

Если вам нужно добавить новые поля в CMS, не забудьте обновить типы в файле `src/graphql/types/pageTypes.ts`.
