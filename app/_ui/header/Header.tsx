"use client"
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'

const data = [{img:"/pn.png",title:"Hyundai Tucson",info:"A stylish, compact SUV offering comfort and performance"},
  {img:"/car.png",title:"Toyota Fortuner TRD Sportivo",info:"A rugged SUV built for off-road power and adventure."},
  ]

const Header = () => {
// const {data} = GetByIdQuery(6)
// console.log(data?.images)
  return (
       <div className=" border">
  <Carousel className="">
    <CarouselContent className="">
      {
        data.map((item,idx)=>{
            return <CarouselItem key={idx}
            className='w-full h-[300px] lg:h-[600px]   relative'
            >
             <div 
              style={{ backgroundImage: `url(${item.img})` }}
                key={idx} className="flex items-center w-full h-full  justify-center  bg-no-repeat bg-cover ">
             
                     

             </div>
           <div className="absolute inset-0 bg-blue-900/60">
           <div className='w-[80%] mx-auto h-full'>
                <div className='w-full h-full flex items-center justify-between'>
                      <div className='w-full md:w-1/2' >
                           <h4 className='p-2 mb-2 text-lg text-gray-100 '>
                                {item.title}
                           </h4>
                           <p className='p-2 mb-2 text-gray-50 text-3xl font-extrabold '>
                               {item.info}
                           </p>

                           <div className='flex items-center gap-3'>
                            <Button className='bg-green-500/70 cursor-pointer hover:bg-green-500'>Shop Now</Button>
                           </div>
                      </div>
                </div>
           </div>
                
           </div>
            
      </CarouselItem>
        })
      }
 
    </CarouselContent>
    <CarouselPrevious className="left-4" />
    <CarouselNext className="right-4" />
  </Carousel>
</div>
  )
}

export default Header
