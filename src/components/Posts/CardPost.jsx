import { useNavigate } from 'react-router-dom'
import './CardPosts.css'

export const CardPost = ({_id,title, description, course, publicationDate, repository}) => {
    const formatdate = new Date(publicationDate).toLocaleDateString('en-US')

    const navigate = useNavigate()

    const handdleCommentsClick = () => {
        if (!_id) {
      console.error('ID del post es undefined')
      return
    }
        navigate(`/home/posts/${_id}/comments`)
    }
    return (
        <div className="card" style={{width: '18rem'}}>
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">{course}</p>
                <p className="card-text">{formatdate}</p>

                <button onClick={handdleCommentsClick}>
                    Comentarios
                </button>
        </div>
    )
}