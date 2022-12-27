import React from 'react'

import './EditPageFilter.css';

const EditPageFilter = () => {

    const handleChange = () => {

    }
  return (
    <div className='editPageFilter-container'>
        <div className='filter-selection'>
            <label htmlFor="">Filter By Year Added: </label>
            <select name="filter" id="filter">
                <option value="date">2022</option>
            </select>
            <label htmlFor="">Filter By Month Added: </label>
            <select name="filter" id="filter">
                <option value="date">January</option>
            </select>
            <label htmlFor="">Filter By Date Added: </label>
            <select name="filter" id="filter">
                <option value="date">Today</option>
            </select>
            <label className="box-container">Title
                <input type="checkbox" checked="checked" onChange={handleChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="box-container">Likes
                <input type="checkbox" checked="checked" onChange={handleChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="box-container">Comments
                <input type="checkbox" checked="checked" onChange={handleChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="box-container">Body
                <input type="checkbox" checked="checked" onChange={handleChange}/>
                <span className="checkmark"></span>
            </label>
            <label className="box-container">Image
                <input type="checkbox" checked="checked" onChange={handleChange}/>
                <span className="checkmark"></span>
            </label>
        </div>
    </div>
  )
}

export default EditPageFilter