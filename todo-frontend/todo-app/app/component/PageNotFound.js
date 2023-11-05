import React from 'react'

import Video from './Video'
function PageNotFound({data}) {
    return (
        <div className='w-full h-[100vh] flex items-center justify-center'>
            <div className='fixed'>
                <h1 className='text-white text-lg sm:text-2xl'>404 | {data}</h1>
            </div>
            <Video />
        </div>
    )
}

export default PageNotFound
