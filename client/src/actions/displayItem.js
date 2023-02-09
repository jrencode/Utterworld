
export const getSearchItem = (searchTerm) => (dispatch) => {
    const text = searchTerm;
    dispatch({type: 'SEARCHWORDS', payload: text})
}

export const getFilterItem = (selectedFilters) => (dispatch) => {
    const filters = selectedFilters;
    dispatch({type: 'FILTERS', payload: filters })
}
export const getSortByDateItem = (isSorted) => (dispatch) => {
    dispatch({type: 'SORT', payload: isSorted })
}
export const getShuffleItem = (shuffle) => (dispatch) => {
    dispatch({type: 'SHUFFLE', payload: shuffle})
}