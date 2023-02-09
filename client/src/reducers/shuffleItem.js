export default (shuffle = false, action) => {
    switch (action.type) {
       case 'SHUFFLE':
          return action.payload
        default:
          return shuffle
    }
}