import { combineReducers } from 'redux';

import posts from './posts';
import searchTerm from './navSearch';
import filters from './filterSearch';
import editItemId from './editItem';

export const reducers = combineReducers({ posts, searchTerm, filters, editItemId });