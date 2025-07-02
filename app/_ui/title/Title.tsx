import React, { FC } from 'react'

const Title:FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <div className='my-8'>
      <h1 className='text-center p-2 text-green-500 text-md md:text-2xl lg:text-3xl font-extrabold'>{children}</h1>
    </div>
  )
}

export default Title
