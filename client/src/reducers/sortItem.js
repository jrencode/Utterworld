export default (isSorted = true, action) => {
    switch (action.type) {
       case 'SORT':
          return action.payload
        default:
          return isSorted
    }
}