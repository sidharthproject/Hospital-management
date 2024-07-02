import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
function Loader() {
  return (
    <div className='flex items-center justify-center w-full h-full'>
        <HashLoader color="#0067FF"/>
    </div>
  )
}

export default Loader