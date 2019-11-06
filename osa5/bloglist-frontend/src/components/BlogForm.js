import React from 'react'


const blogForm = ({
    
    newBlog,
    newAuthor,
    newUrl,
    addBlog,
    reset
    
}) => {

    return (
    <form onSubmit={addBlog}>
    <div>
      Title <input {...newBlog} />
    </div>
    <div>
      Author <input {...newAuthor} />
    </div>
    <div>
      Url <input {...newUrl} />
    </div>
    <button type="submit">add new</button>
    </form>
  )
}



export default blogForm

