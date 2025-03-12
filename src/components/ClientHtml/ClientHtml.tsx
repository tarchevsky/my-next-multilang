'use client'

import { createElement, ElementType, useEffect, useState } from 'react'

interface ClientHtmlProps {
	html: string
	as?: ElementType
}

export default function ClientHtml({ html, as = 'div' }: ClientHtmlProps) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	if (!isClient) {
		return createElement(as, {}, html.replace(/<[^>]*>/g, ''))
	}

	return createElement(as, { dangerouslySetInnerHTML: { __html: html } })
}
