import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const CommentsPage = () => {
  const { postId } = useParams()
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // Obtener comentarios
    axios.get(`http://localhost:3040/v1/posts/${postId}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err))
  }, [postId])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:3040/v1/posts/${postId}/comments`, { text: newComment })
      .then(res => {
        setComments([...comments, res.data])
        setNewComment('')
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h2>Comentarios</h2>

      <ul>
        {comments.map(c => <li key={c._id}>{c.text}</li>)}
      </ul>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          required
        />
        <button type="submit">Agregar comentario</button>
      </form>
    </div>
  )
}

export default CommentsPage
