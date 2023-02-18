import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { getFilterItem } from '../../actions/displayItem';
import { getPostsByAuthor } from '../../actions/posts';
import ToggleImage from '../../reusable_Components/ToggleImage';
import Cookies from 'js-cookie';
import { detectWidth } from '../../reusable_Functions/detectScreenWidth';

import './EditPageFilter.css';

const EditPageFilter = () => {
    const dispatch = useDispatch();
    const userEmail = Cookies.get('auth_email');

    const d = new Date();
    const currentYear = String(d.getFullYear());
    const currentMonth = String(d.getMonth() + 1);
    const currentDate = String(d.getDate());
    const currentNumOfDays = getNumberOfDays();

    
    
    const posts = useSelector((state) => state.posts)
    const [selectYear, setSelectYear] = useState(currentYear);
    const [selectMonth, setSelectMonth] = useState(currentMonth.length > 1 ? currentMonth : '0'+currentMonth);
    const [selectDate, setSelectDate] = useState(currentDate);

    
    const yearsList = ['2022', '2023', '2024', '2025', '2026'];
    const monthsList = [
        '01', '02', '03', '04', '05', '06', '07', 
        '08', '09', '10', '11', '12'
    ];
    function getNumberOfDays() {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    }
    const formatSelectedDate = (date) => {
        if(date.length < 2) {
            return `0${date}`
        } else {
            return date;
        }
    };
      
    const years = posts.map(post => post.createdAt.slice(0,4));

    const addYearList = (years) => {
        
        for(const year of years) {
            if(!yearsList.includes(year)) {
                yearsList.push(year);
            }
        }
    }
    const handleChange = (e) => {
        let selectedFilter = {
            selectedYear: selectYear,
            selectedMonth: selectMonth,
            selectedDate: selectDate,
        }

        if(e.target.name === 'selectedYear') {
            setSelectYear(e.target.value);
            selectedFilter = {...selectedFilter, [e.target.name]: e.target.value}
        }

        if(e.target.name === 'selectedMonth') {
            setSelectMonth(e.target.value);
            selectedFilter = {...selectedFilter, [e.target.name]: e.target.value}
        }
        if(e.target.name === 'selectedDate') {
            setSelectDate(e.target.value);
            selectedFilter = {...selectedFilter, [e.target.name]: formatSelectedDate(e.target.value)}
        }
    }

    useEffect(() => {
        dispatch(getFilterItem({selectedYear: selectYear, selectedMonth: selectMonth, selectedDate: formatSelectedDate(selectDate)}))
        dispatch(getPostsByAuthor())
    },[window.innerWidth, selectYear, selectMonth, selectDate])

    addYearList(years);
  return (
    <div className='editPageFilter-container'>
        <div className='filter-selection'>
            <div className="filter-year">
                <label htmlFor="">Filter By Year Added: </label>
                <select name='selectedYear' id="filter" value={selectYear} onChange={handleChange}>
                    {yearsList ? yearsList.map(year => <option value={year} name={year} key={year}> {year } </option>) : 2021 }
                    
                </select>
            </div>
            <div className="filter-month">
                <label htmlFor="">Month Added: </label>
                <select name='selectedMonth' id="filter" value={selectMonth} onChange={handleChange}>
                    { monthsList ? monthsList.map(month  => <option value={month} name={month} key={month}> {month} </option>) : ''}
                    
                </select>
            </div>
            <div className="filter-date">
                <label htmlFor="">Date Added: </label>
                <select name="selectedDate" id="filter" value={selectDate} onChange={handleChange}>
                    {Array.from({ length: currentNumOfDays }, (_, index) => (
                        <option value={index + 1} key={index + 1}>{index + 1} </option>
                    ))} 
                </select>
            </div>
            <ToggleImage/>
        </div>
    </div>
  )
}

export default EditPageFilter