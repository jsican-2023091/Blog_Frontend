import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPostById, getCommentsByPostId, createComment } from '../../services/api.js'
import './CommentCSS.css'

const CommentsPage = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
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
    if (!newComment.trim()) return

    setLoading(true)
    const commentData = { content: newComment, post: postId }

    const res = await createComment(commentData)
    if (!res.error) {
      const resComments = await getCommentsByPostId(postId)
      if (!resComments.error) setComments(resComments.data.comments)
      setNewComment('')
      setShowForm(false) // opcional: oculta el formulario tras enviar
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

      <button 
        className='toggle-form-btn' 
        onClick={() => setShowForm(prev => !prev)}
      >
        {showForm ? 'Cancelar' : 'Agregar Comentario'}
      </button>

      {showForm && (
        <form className='comment-form' onSubmit={handleSubmit}>
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
          comments.map(c => <li key={c._id}>{c.content}</li>)
        )}
      </ul>
    </div>
  )
}

export default CommentsPage
