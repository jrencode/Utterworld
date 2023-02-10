
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getShuffleItem, getSortByDateItem } from '../../actions/displayItem';
import './Filter.css'

const Filter = () => {
  const dispatch = useDispatch();

  let sort = true;
  let shuffle = false;

  const sortPosts = () => {
    sort = !sort
    dispatch(getSortByDateItem(sort))
  };
  const shufflePosts = () => {
    shuffle = !shuffle
    dispatch(getShuffleItem(shuffle))

    if(shuffle) {
    setTimeout(() => {
        shuffle = false;
        dispatch(getShuffleItem(shuffle))
      }, 5000)

    }
    
  };
  return (
    <div className="filter-section">
        <div className='filter-container'>
            <div className="left-filter">
                <button className='sortBtn' onClick={() => sortPosts()}>Sort</button>
                <button className='shuffleBtn' onClick={() => shufflePosts()}>Shuffle</button>
            </div>
            <div className="right-filter">
                <h5>Category</h5>
            </div>
        </div>
    </div>
    
  )
}

export default Filter

