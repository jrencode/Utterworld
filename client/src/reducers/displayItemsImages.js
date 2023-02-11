export default (isChecked = true, action) => {
    switch (action.type) {
       case 'TOGGLE_IMAGES':
          return action.payload
        default:
          return isChecked
    }
}