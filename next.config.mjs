/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'ecotc.com',
			},
		],
	},
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
