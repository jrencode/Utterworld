export default (searchTerm = '', action) => {
    switch (action.type) {
       case 'SEARCHWORDS':
          return action.payload
        default:
          return searchTerm
    }
}