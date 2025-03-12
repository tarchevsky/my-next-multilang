'use client'

import { HtagProps } from '@/types'
import { Fragment, memo, useEffect, useState } from 'react'

const Htag = memo(({ tag, children, className }: HtagProps) => {
	const Tag = tag
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const renderContent = () => {
		if (typeof children === 'string') {
			// Если мы на сервере или при первом рендере на клиенте, возвращаем строку как есть
			if (!isClient) {
				return children
			}
			// После гидратации на клиенте применяем разбиение по <br />
			return children.split('<br />').map((text, index, array) => (
				<Fragment key={index}>
					{text}
					{index < array.length - 1 && <br />}
				</Fragment>
			))
		}
		return children
	}

	return (
		<Tag className={`${className ? className + ' ' : ''}mb-8`}>
			{renderContent()}
		</Tag>
	)
})

Htag.displayName = 'Htag'

export default Htag
