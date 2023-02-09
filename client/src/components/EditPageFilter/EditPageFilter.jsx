import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { getFilterItem } from '../../actions/displayItem';

import './EditPageFilter.css';

const EditPageFilter = () => {
    const dispatch = useDispatch();

    const d = new Date();
    const currentYear = String(d.getFullYear());
    const currentMonth = String(d.getMonth() + 1);


    const posts = useSelector((state) => state.posts)
    console.log(currentMonth.length);
    const [selectYear, setSelectYear] = useState(currentYear);
    const [selectMonth, setSelectMonth] = useState(currentMonth.length > 1 ? currentMonth : '0'+currentMonth);

    const [isChecked, SetIsChecked] = useState(true);
    
    const yearsList = ['2022', '2023', '2024', '2025', '2026'];
    const monthsList = [
        '01', '02', '03', '04', '05', '06', '07', 
        '08', '09', '10', '11', '12'
    ];
    const years = posts.map(post => post.createdAt.slice(0,4));
    const months = posts.map(post => post.createdAt.slice(5, 7));

    const addYearList = (years) => {
        
        for(const year of years) {
            if(!yearsList.includes(year)) {
                yearsList.push(year);
                console.log('year added')
            } else {
                console.log('year found')
            }
        }
    }
    const handleChange = (e) => {
        let selectedFilter = {
            selectedYear: selectYear,
            selectedMonth: selectMonth,
        }

        if(e.target.name === 'selectedYear') {
            setSelectYear(e.target.value);
            selectedFilter = {...selectedFilter, [e.target.name]: e.target.value}
            console.log(selectedFilter)
        }

        if(e.target.name === 'selectedMonth') {
            setSelectMonth(e.target.value);
            selectedFilter = {...selectedFilter, [e.target.name]: e.target.value}
        }
        console.log(selectedFilter);

        dispatch(getFilterItem(selectedFilter))
    }
    const handleCheckbox = () => {
        SetIsChecked(!isChecked);
        console.log(isChecked);
    }

    useEffect(() => {
        dispatch(getFilterItem({selectedYear: selectYear, selectedMonth: selectMonth}))
    })

    addYearList(years);
    console.log(yearsList);
  return (
    <div className='editPageFilter-container'>
        <div className='filter-selection'>
            <label htmlFor="">Filter By Year Added: </label>
            <select name='selectedYear' id="filter" value={selectYear} onChange={handleChange}>
                {yearsList ? yearsList.map(year => <option value={year} name={year} key={year}> {year } </option>) : 2021 }
                
            </select>
            <label htmlFor="">Filter By Month Added: </label>
            <select name='selectedMonth' id="filter" value={selectMonth} onChange={handleChange}>
                { monthsList ? monthsList.map(month  => <option value={month} name={month} key={month}> {month} </option>) : ''}
                
            </select>
            <label htmlFor="">Filter By Date Added: </label>
            <select name="filter" id="filter">
                <option value="date">Today</option>
            </select>
            <label className="box-container">Likes
                <input type="checkbox" checked={isChecked} onChange={handleCheckbox}/>
            </label>
            <label className="box-container">Comments
                <input type="checkbox" checked="checked" onChange={handleCheckbox}/>
            </label>
            <label className="box-container">Body
                <input type="checkbox" checked="checked" onChange={handleCheckbox}/>
            </label>
            <label className="box-container">Image
                <input type="checkbox" checked="checked" onChange={handleCheckbox}/>
            </label>
        </div>
    </div>
  )
}

export default EditPageFilter