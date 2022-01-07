import React, { useState } from 'react'

const BlogForm = ({
    createBlog
}) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newURL, setNewURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newURL
        })

        setNewTitle('')
        setNewAuthor('')
        setNewURL('')
    }


    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    Title: <input
                        id='title'
                        value={newTitle}
                        onChange={({ target }) => setNewTitle(target.value)} />
                </div>
                <div>
                    Author: <input
                        id='author'
                        value={newAuthor}
                        onChange={({ target }) => setNewAuthor(target.value)} />
                </div>
                <div>
                    URL: <input
                        id='url'
                        value={newURL}
                        onChange={({ target }) => setNewURL(target.value)} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}


export default BlogForm