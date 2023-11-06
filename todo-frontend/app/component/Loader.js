import React from 'react'
import { Bars } from 'react-loader-spinner'
import Video from './Video'
function Loader() {
  return (
    <div className='w-full h-[100vh] flex items-center justify-center'
    >
      <div className='fixed'>
       <Bars
            height="80"
            width="80"
            color="#ffffff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
       </div>
        <Video/> 
        
       

 </div>
  )
}

export default Loader