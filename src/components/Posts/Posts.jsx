import { useContextPosts } from '../../shared/hooks/useContextPosts.jsx'
import { CardPost } from './CardPost.jsx'
import { useState } from 'react'
import './Posts.css'
import Modal from '../Modal.jsx'

export const Posts = () => {
  const { posts } = useContextPosts()

  if(!posts) return <p>Cargando los posts</p>
  return (
    <div>
        <header>
            <h1>Publicaciones</h1>
        </header>

        <div >
          <div>
              <h2>Mis publicaciones</h2>
          </div>



          <div className='cards-container'>
          { posts.map(
            (post)=> (
              <CardPost 
              key={post._id}
              _id={post._id}
              title={post.title}
              description={post.description}
              course={post.course}
              repository={post.repository}
              publicationDate={post.publicationDate}
              />
            )
          )
        }

        </div>
      </div>

    </div>
  )
}

export default Posts
