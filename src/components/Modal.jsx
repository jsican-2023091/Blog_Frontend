import React from 'react'
import { Form } from './Form.jsx'
import { useApi } from '../shared/hooks/useApi.jsx'

const Modal = ({onCreate}) => {
    const { addPubli } = useApi()
     
    const createPost = (data) => {
        console.log(data)
        addPubli(data)
    }
  return (
    <>
        <div >
            <div >
                <div >
                    <div >
                        <h1 >Modal title</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div >
                        <Form onSubmitForm={createPost}/>
                    </div>
                    <div >
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button form='postForm' type="submit" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal
