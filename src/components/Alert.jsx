import React from 'react'

const Alert = ({children}) => {
  return (
    <div
    className='bg-red-300 hover:bg-red-400 rounded-sm text-center md:w-5/6 mt-1 mx-auto text-xs'
    >
        {children}
    </div>
  )
}

export default Alert