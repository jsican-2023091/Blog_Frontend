import React from 'react'
import { useForm } from 'react-hook-form'

export const Form = ({onSubmitForm}) => {
    const  {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        defaultValues: {
            title: '',
            course: '',
            description: ''
        }
    })

    const addPost = (data)=>{
        //hook personalizado
        //addPost
        onSubmitForm(data)
    }
  return (
      <div>
          <form id='postForm' onSubmit={handleSubmit(addPost)}>
              <div className="mb-3">
                  <label htmlFor="titleInput" className="form-label">Titulo</label>
                  <input {...register('title', { required: 'El título es obligatorio'})} type="text" className="form-control" id="titleInput" aria-describedby="emailHelp" />
              </div>
                { errors.title && (
                    <span>
                        {errors.title.message}
                    </span>
                )}
              <div className="mb-3">
                  <label htmlFor="categorySelect" className="form-label">Titulo</label>
                  <select {...register('category', {required: 'La categorías es obligatoria'})} className="form-control" id="categorySelect">
                    <option value="">Selecciona una opción</option>
                    <option value="6818fbe05cfc6f52143a2a28">Por defecto</option>
                    <option value="c">Comida</option>
                    <option value="a">Videojuegos</option>
                  </select>
              </div>
              {
                errors.category && (
                    <span>
                        {errors.category.message}
                    </span>
                )
              }
              <div className="mb-3">
                  <label htmlFor="contentInput" className="form-label">Contenido</label>
                  <textarea {...register('content', {required: 'El contenido es obligatorio'})} className="form-control" id="contentInput"></textarea>
              </div>
              {
                errors.content && (
                    <span>
                        {errors.content.message}
                    </span>
                )
              }
          </form>
      </div>
  )
}


export default Form
