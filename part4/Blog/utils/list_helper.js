const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    total = 0
    blogs.forEach(element => {
        total += element.likes
    });
    return total
}

const favouriteBlog = (blogs) => {
    mostFavouriteBlog = {}
    if (!blogs.length == 0) {
        console.log("REDUCING")
        mostFavouriteBlog = blogs.reduce((a, b) => a.likes > b.likes ? a : b)
    } else {
        console.log("NOT REDUCING")
    }

    delete mostFavouriteBlog.__v
    delete mostFavouriteBlog._id
    delete mostFavouriteBlog.url
  
    return mostFavouriteBlog
}

const mostBlogs = (blogs) => {
    mostFavouriteBlog = {}
    if (!blogs.length == 0) {
        mostFavouriteBlog = blogs.reduce((a, b) => {
            
            a.likes > b.likes ? a : b
        })
    } else {
        console.log("NOT REDUCING")
    }

    delete mostFavouriteBlog.__v
    delete mostFavouriteBlog._id
    delete mostFavouriteBlog.url
  
    return mostFavouriteBlog
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}