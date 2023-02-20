export const getEditItem = (selectedStory) => (dispatch) => {
    const story = selectedStory;
    dispatch({ type: 'EDIT', payload: story})
}