export default (posts = [], action) => {
    switch (action.type) {
       case 'FETCH_ALL':
          return action.payload
       case 'CREATE':
          return [...posts, action.payload]
       case 'UPDATE':
          return [
             ...posts,
             posts.map((post) =>
                post.id === action.payload.id ? action.payload : post,
             ),
          ]
       case 'LIKE':
          return [
             ...posts,
             posts.map((post) =>
                post.id === action.payload.id ? action.payload : post,
             ),
          ]
       case 'DELETE':
          return posts.filter((post) => post._id !== action.payload)
       default:
          return posts
    }
 }