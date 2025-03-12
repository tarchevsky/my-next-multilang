/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			// Перенаправляем /ru на корень сайта
			{
				source: '/ru',
				destination: '/',
				permanent: true,
			},
			{
				source: '/ru/:path*',
				destination: '/:path*',
				permanent: true,
			},
		]
	},
}

export default nextConfig
