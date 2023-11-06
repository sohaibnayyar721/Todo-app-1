import React from 'react'

function Video() {
    return (
        <div className='w-[100%] h-[100vh]'>     
            <video autoPlay loop muted className="w-[100%] h-full object-cover opacity-50 md:opacity-25 " >
                <source src="/bgVideo.mp4" type="video/mp4" />
            </video></div>
    )
}

export default Video
