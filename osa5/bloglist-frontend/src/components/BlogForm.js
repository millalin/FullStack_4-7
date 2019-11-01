import React from 'react'

const blogForm = ({
    handleSubmit,
    newBlog,
    newAuthor,
    newUrl,
    handlenewblog,
    handlenewauthor,
    handlenewurl
}) => {
    return (
    <form onSubmit={handleSubmit}>
    <div>
      Title <input type="text" value={newBlog} name="Title"
        onChange={handlenewblog} />
    </div>
    <div>
      Author <input type="text" value={newAuthor} name="Author"
      onChange={handlenewauthor} />
    </div>
    <div>
      Url <input type="text" value={newUrl} name="Url"
      onChange={handlenewurl} />
    </div>
    <button type="submit">add new</button>
    </form>
  )
}

export default blogForm

