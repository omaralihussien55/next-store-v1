"use client"
import React, { FC } from 'react'
import Title from '../title/Title'
import { GetProductQuery } from '@/reactQuery/products/ProductsQuery'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { Product } from '@/reactQuery/types'
import { Button } from '@/components/ui/button'

const SectionProduct = () => {
    const {data} = GetProductQuery()

  return (
    <div className='mb-12 '>
      <Title >Feature Products</Title>


<Carousel className=''>
  <CarouselContent className='gap-6'>
    {data&& data.products.map((item:Product,idx:number)=>{
        return <CarouselItem key={idx} className="h-[200px] md:h-[300px] basis-40 md:basis-52 ">
            <CardItem item={item} />
        </CarouselItem>
    })}
    
  </CarouselContent>
   <CarouselPrevious className="left-4" />
    <CarouselNext className="right-4" />
</Carousel>
    </div>
  )
}

export default SectionProduct

const CardItem:FC<{item:Product}> = ({item})=>{

    return <div className='w-full h-full flex items-center justify-between flex-col gap-2 aspect-square bg-white  rounded-2xl shadow-lg p-2'>
             <div className='w-full   h-[35%] md:h-[40%] overflow-hidden'>
                <img src={item.images[0]} alt="" className='h-full w-full' />
             </div>
             <div className='w-full h-[65%] md:h-[60%]  flex flex-col justify-between  '>
                 <h2 className='p-1 mb-1 text-gray-700 font-bold text-[10px] md:text-sm'>{item.title.slice(0, 15)}</h2>
                 <h3 className='p-1 mb-1 text-gray-400 text-[10px] md:text-sm'>{item.description.slice(0, 29)}</h3>
                 <div className='flex items-end  justify-between gap-2 mb-2'>
                    <span className='block text-gray-500 text-[9px]  md:text-sm '>{item.price} <span className='text-green-700'>$</span></span>
                    <Button className='bg-green-600 text-white rounded-2xl text-[10px]  md:text-sm'>Add to card</Button>
                 </div>
             </div>
    </div>
}


