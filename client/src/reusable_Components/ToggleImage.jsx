import React, { useEffect, useState } from 'react'

import { useDispatch } from 'react-redux'
import { toggleImages } from '../actions/displayImages'

import './ToggleImage.modules.css'

const ToggleImage = () => {
    const [isChecked, setIsChecked] = useState(true)

    const dispatch = useDispatch();

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
        console.log(isChecked);
        dispatch(toggleImages(isChecked))
    }
    useEffect(() => {
        dispatch(toggleImages(isChecked))
    })
  return (
    <div>
        <label className='checkbox-label'>Image</label>
        <input type="checkbox" checked={isChecked} onChange={() => handleCheckbox()}/>
    </div>
  )
}

export default ToggleImage