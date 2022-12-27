import { combineReducers } from 'redux';

import posts from './posts';
import searchTerm from './navSearch';

export const reducers = combineReducers({ posts, searchTerm });