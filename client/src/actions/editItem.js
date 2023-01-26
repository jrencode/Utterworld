export const getEditItem = (item) => (dispatch) => {
    const story = item;
    dispatch({ type: 'EDIT', payload: story})
}