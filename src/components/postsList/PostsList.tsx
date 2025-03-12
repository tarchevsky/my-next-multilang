import { PostsListProps } from '@/graphql/types/postTypes'
import Link from 'next/link'
import { FC } from 'react'

const PostsList: FC<PostsListProps> = ({
	posts,
	postsTitle,
	readText = 'Читать статью',
}) => {
	if (posts.length === 0) {
		return (
			<div className='text-center py-12'>
				<p className='text-gray-300 font-thin'>Пока здесь нет постов</p>
			</div>
		)
	}

	return (
		<div className='my-10'>
			<h2 className='mb-12 text-3xl font-thin'>{postsTitle}</h2>
			<ul className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{posts.map(post => (
					<li
						key={post.slug}
						className='border-[1px] border-gray-200 rounded-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-1'
					>
						<div className='p-6 h-full'>
							<Link
								href={post.path}
								className='min-h-40 h-full flex flex-col justify-between'
							>
								<h3
									className='ind text-2xl font-thin'
									dangerouslySetInnerHTML={{
										__html: post.title,
									}}
								/>
								<p
									dangerouslySetInnerHTML={{
										__html: post.excerpt,
									}}
								/>
								<div className='hover:underline'>{readText}</div>
							</Link>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default PostsList
