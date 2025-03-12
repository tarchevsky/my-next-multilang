import ClientHtml from '@/components/ClientHtml/ClientHtml'
import Htag from '@/components/Htag/Htag'
import { createLocalizedPageTemplate } from '@/lib/pageTemplates'

// ID страницы контактов в CMS
const CONTACTS_PAGE_ID = 'cG9zdDoxMDI='

// Создаем локализованную страницу с помощью шаблона
const { generateMetadata, generateStaticParams, Page } =
	createLocalizedPageTemplate(
		CONTACTS_PAGE_ID,
		({ pagecontent, title, locale }) => {
			return (
				<div className='cont'>
					<Htag tag='h1'>{title}</Htag>
					{pagecontent ? (
						<>
							{pagecontent.address && (
								<ClientHtml html={pagecontent.address} as='div' />
							)}
							{pagecontent.telefon && (
								<ClientHtml html={pagecontent.telefon} as='div' />
							)}
							{pagecontent.email && (
								<ClientHtml html={pagecontent.email} as='div' />
							)}
						</>
					) : (
						<div>
							{locale === 'ru'
								? 'Нет данных для отображения'
								: 'No data to display'}
						</div>
					)}
				</div>
			)
		}
	)

export { generateMetadata, generateStaticParams }
export default Page
