import { Check } from 'lucide-react'
import React, { FC } from 'react'

const Successfull:FC<{num:number}> = ({num}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
            <div className='flex flex-col items-center justify-center mb-10'>
                <Check size={60} className='text-green-600 font-extrabold' />
                <p className='text text-green-700 mt-3'>Successfull</p>
            </div>
            
            <div className='w-1/2 text-center mb-8 text-gray-500 text-[12px] md:text-sm'>
                your order number is <span className='text-green-600'># {num}</span> <br/>

                you will receive the order
                confirmation email shortly 
            </div>

            <p className='text-gray-800 text-[12px] md:text-sm'> thank you for shoping with us</p>
      
    </div>
  )
}

export default Successfull
