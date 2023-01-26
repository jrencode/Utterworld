export default (editItemId = '', action) => {
    switch (action.type) {
       case 'EDIT':
          return action.payload
        default:
          return editItemId
    }
}