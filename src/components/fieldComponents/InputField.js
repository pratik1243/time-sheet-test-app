import React from 'react'

const InputField = ({ label, value, placeholder, endIcon = null }) => {
  return (
    <div>
        <label>{label}</label>
        <input type="text" value={value} placeholder={placeholder} className='input-field' />
        {endIcon && endIcon}
    </div>
  )
}

export default InputField