export default (filters = {}, action) => {
    switch (action.type) {
       case 'FILTERS':
          return action.payload
        default:
          return filters
    }
}