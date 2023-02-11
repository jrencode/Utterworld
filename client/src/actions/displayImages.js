export const toggleImages = (isChecked) => (dispatch) => {
    dispatch({type: 'TOGGLE_IMAGES', payload: isChecked })
}