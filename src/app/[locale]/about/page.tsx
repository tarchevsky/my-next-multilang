import Htag from '@/components/Htag/Htag'
import { createLocalizedPageTemplate } from '@/lib/pageTemplates'

// ID страницы "О нас" в CMS
const ABOUT_PAGE_ID = 'cG9zdDoxNDU='

// Создаем локализованную страницу с помощью шаблона
const { generateMetadata, generateStaticParams, Page } =
	createLocalizedPageTemplate(
		ABOUT_PAGE_ID,
		({ pagecontent, title, locale }) => (
			<div className='cont'>
				<Htag tag='h1'>{title}</Htag>
				{pagecontent && (
					<div className='about-content'>
						{/* Здесь можно добавить любые компоненты и использовать данные из pagecontent */}
						{pagecontent.whatWeDo && (
							<div className='about-section'>
								<h2>{locale === 'ru' ? 'Чем мы занимаемся' : 'What we do'}</h2>
								<p>{pagecontent.whatWeDo}</p>
							</div>
						)}

						{pagecontent.ourActivity && (
							<div className='about-section'>
								<h2>
									{locale === 'ru' ? 'Наша деятельность' : 'Our activity'}
								</h2>
								<p>{pagecontent.ourActivity}</p>
							</div>
						)}

						{/* Можно добавить любые другие секции */}
					</div>
				)}
			</div>
		)
	)

export { generateMetadata, generateStaticParams }
export default Page
