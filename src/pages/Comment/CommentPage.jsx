import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // importa useNavigate
import { getPostById, getCommentsByPostId, createComment } from '../../services/api.js'
import './CommentCSS.css'

const CommentsPage = () => {
  const { postId } = useParams()
  const navigate = useNavigate() // instancia el hook navigate
  const [post, setPost] = useState(null)
  const [name, setName] = useState('')
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // enero es 0
    const year = String(date.getFullYear()).slice(-2) // últimos 2 dígitos
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    async function fetchData() {
      const resPost = await getPostById(postId)
      if (!resPost.error) setPost(resPost.data.post)
      else console.error(resPost.err)

      const resComments = await getCommentsByPostId(postId)
      if (!resComments.error) setComments(resComments.data.comments)
      else console.error(resComments.err)
    }
    fetchData()
  }, [postId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim() || !newComment.trim()) return

    setLoading(true)
    const commentData = {
      name,
      content: newComment,
      post: postId
    }

    const res = await createComment(commentData)
    if (!res.error) {
      const resComments = await getCommentsByPostId(postId)
      if (!resComments.error) setComments(resComments.data.comments)
      setNewComment('')
      setName('')
      setShowForm(false)
    } else {
      console.error(res.err)
    }
    setLoading(false)
  }

  if (!post) return <p>Cargando publicación...</p>

  return (
    <div className='comments-container'>
      <header className='post-header'>
        Publicación
      </header>

      <div className='post-container'>
        <h2 className='title'>Titulo: {post.title}</h2>
        <p className='description'>Descripción: {post.description}</p>
        <p className='course'>Curso: {post.course}</p>
        <p className='publicationDate'>Fecha: {formatDate(post.publicationDate)}</p>
        <p className='publicationRepositoryDate'>
          Repositorio: <a href={post.repository} target="_blank" rel="noopener noreferrer">link</a>
        </p>
      </div>

      {/* Aquí el botón para regresar */}
      <button
        className='back-to-posts-btn'
        onClick={() => navigate('/home/posts')}
        style={{ marginBottom: '1rem' }}
      >
        ← Volver a Publicaciones
      </button>

      <button 
        className='toggle-form-btn' 
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? 'Cancelar' : 'Agregar Comentario'}
      </button>

      {showForm && (
        <form className='comment-form' onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Tu nombre'
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={12}
            required
          />

          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            required
            placeholder='Escribe tu comentario aquí...'
          />
          <button type='submit' disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      )}

      <h3>Comentarios</h3>
      <ul className='comments-list'>
        {comments.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comments.map(c => (
            <li key={c._id} className="comment-item">
              <p><strong>{c.name}</strong> <span className="comment-date">{formatDate(c.date)}</span></p>
              <p>{c.content}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default CommentsPage
