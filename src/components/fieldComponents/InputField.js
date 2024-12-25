import React from 'react'

const InputField = ({ label, placeholder, endIcon = null }) => {
  return (
    <div>
        <label>{label}</label>
        <input type="text" placeholder={placeholder} className='input-field' />
        {endIcon && endIcon}
    </div>
  )
}

export default InputField