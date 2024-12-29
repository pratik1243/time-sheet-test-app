import React from 'react'

const InputField = ({ label, value, placeholder, endIcon = null, readOnly = null }) => {
  return (
    <div className='text-field-sec'>
        <label>{label}</label>
        <input type="text" value={value} placeholder={placeholder} readOnly={readOnly} className='input-field' />
        {endIcon && <img src={endIcon} className='input-field-endicon' /> }
    </div>
  )
}

export default InputField