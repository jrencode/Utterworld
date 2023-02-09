import { combineReducers } from 'redux';

import posts from './posts';
import searchTerm from './navSearch';
import filters from './filterSearch';
import editItemId from './editItem';
import isSorted from './sortItem';
import shuffleItem from './shuffleItem';

export const reducers = combineReducers({ posts, searchTerm, filters, editItemId, isSorted, shuffleItem });