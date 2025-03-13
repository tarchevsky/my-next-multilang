import { RelatedPost } from '@/graphql/types/pageTypes'
import Link from 'next/link'

interface RelatedPostsProps {
	posts: RelatedPost[]
	title: string
}

const RelatedPosts = ({ posts, title }: RelatedPostsProps) => {
	console.log('RelatedPosts component received:', { posts, title })

	if (!posts || posts.length === 0) {
		console.log('No posts to display')
		return null
	}

	return (
		<section className='mt-16 mb-8'>
			<h2 className='text-3xl font-thin mb-8'>{title}</h2>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{posts.map(post => (
					<Link
						key={post.id}
						href={`/posts/${post.slug}`}
						className='group block p-6 border rounded-md transition-all duration-300'
					>
						<h3 className='text-xl font-thin'>{post.title}</h3>
					</Link>
				))}
			</div>
		</section>
	)
}

export default RelatedPosts
