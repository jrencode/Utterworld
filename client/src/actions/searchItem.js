
export const getWords = (searchTerm) => (dispatch) => {
    const text = searchTerm;
    dispatch({type: 'SEARCHWORDS', payload: text})
}