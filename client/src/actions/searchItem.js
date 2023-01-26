
export const getSearchItem = (searchTerm) => (dispatch) => {
    const text = searchTerm;
    dispatch({type: 'SEARCHWORDS', payload: text})
}

export const getFilterItem = (selectedFilters) => (dispatch) => {
    const filters = selectedFilters;
    console.log(filters);
    dispatch({type: 'FILTERS', payload: filters })
}
