import { useContextPosts } from '../../shared/hooks/useContextPosts.jsx'
import { CardPost } from './CardPost.jsx'
import { useState, useEffect } from 'react'
import './Posts.css'
import { getPostsByCourse } from '../../services/api.js' // importa la función de filtro

export const Posts = () => {
  const { posts: allPosts } = useContextPosts()
  const [posts, setPosts] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('all')
  const [loading, setLoading] = useState(false)

  // Cursos fijos
  const courses = ['Practica', 'Taller', 'Tecnología']

  useEffect(() => {
    if (selectedCourse === 'all') {
      setPosts(allPosts)
      return
    }

    const fetchPostsByCourse = async () => {
      setLoading(true)
      const res = await getPostsByCourse(selectedCourse)
      if (!res.error) setPosts(res.data.posts)
      else {
        console.error(res.err)
        setPosts([])
      }
      setLoading(false)
    }

    fetchPostsByCourse()
  }, [selectedCourse, allPosts])

  if (!allPosts) return <p>Cargando los posts</p>

  return (
    <div>
      <header>
        <h1>Publicaciones</h1>
      </header>

      <div>
        <h2>Mis publicaciones</h2>

        {/* Botones fijos */}
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setSelectedCourse('all')}
            className={selectedCourse === 'all' ? 'active' : ''}
          >
            Todos
          </button>
          {courses.map(course => (
            <button
              key={course}
              onClick={() => setSelectedCourse(course)}
              className={selectedCourse === course ? 'active' : ''}
            >
              {course}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Cargando publicaciones...</p>
        ) : (
          <div className="cards-container">
            {(!posts || posts.length === 0) ? (
              <p>No hay publicaciones para este curso.</p>
            ) : (
              posts.map(post => (
                <CardPost
                  key={post._id}
                  _id={post._id}
                  title={post.title}
                  description={post.description}
                  course={post.course}
                  repository={post.repository}
                  publicationDate={post.publicationDate}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Posts
