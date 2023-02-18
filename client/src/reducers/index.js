import { combineReducers } from 'redux';

import posts from './posts';
import searchTerm from './navSearch';
import filters from './filterSearch';
import editItemId from './editItem';
import isSorted from './sortItem';
import shuffleItem from './shuffleItem';
import imagesIsChecked from './displayItemsImages';
import authReducer from './auth';

export const reducers = combineReducers({authReducer, posts, searchTerm, filters, editItemId, isSorted, shuffleItem, imagesIsChecked });