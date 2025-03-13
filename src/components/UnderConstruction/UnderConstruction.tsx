import React from 'react'
import Htag from '../Htag/Htag'

interface UnderConstructionProps {
	locale: string
}

export const UnderConstruction: React.FC<UnderConstructionProps> = ({
	locale,
}) => {
	return (
		<div className='flex flex-col items-center justify-center p-14 text-center min-h-[85svh]'>
			<Htag tag='h1'>
				{locale === 'ru' ? 'Страница в разработке' : 'Page Under Construction'}
			</Htag>
			<p>
				{locale === 'ru'
					? 'Мы работаем над улучшением этой страницы. Пожалуйста, загляните позже.'
					: 'We are working on improving this page. Please check back later.'}
			</p>
		</div>
	)
}

export default UnderConstruction
