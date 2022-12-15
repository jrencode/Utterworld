import React from 'react'
import './Filter.css'

const Filter = () => {
  return (
    <div className="filter">
        <div className='filter-container'>
            <div className="left-filter">
                <h5>Latest</h5>
                <h5>Random</h5>
            </div>
            <div className="right-filter">
                <h5>CATEGORY</h5>
            </div>
        </div>
    </div>
    
  )
}

export default Filter