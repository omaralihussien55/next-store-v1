"use client"
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { GetCategoryQuery } from '@/reactQuery/category/CategoryQuery'
import { Category } from '@/reactQuery/types'
import React from 'react'
import Title from '../title/Title'
import { useAppDispatch } from '@/redux/hooks'
import { ChangeValueCategory } from '@/redux/counterSlice'
import { useRouter } from 'next/navigation'

const SectionCategory = () => {
    const {data} = GetCategoryQuery()
     const Dispatch = useAppDispatch()
     const navigate = useRouter()
  return (
    <div className='mb-10'>
      <Title >Shop By Category</Title>
      <Carousel>
        <CarouselContent>
                {
                  data && data.map((item:Category,idx:number)=>{
                    return <CarouselItem key={idx} className='basis-40 cursor-pointer' onClick={()=> {
                      Dispatch(ChangeValueCategory(item.name))
                      navigate.push("/products")
                    }}>
                               <Card className='h-full '>
                                    <CardContent className='h-full flex justify-center items-center'>
                                         <p className='text-center'>{item.name}</p>
                                    </CardContent>
                               </Card>
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

export default SectionCategory


