"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import Title from '../title/Title'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { GetProductQuery } from '@/reactQuery/products/ProductsQuery'
import { Product } from '@/reactQuery/types'
import axios from 'axios'

const SectionBrands = () => {
    const [brand,setBrand] = useState<string[]>([])
    // const {data} = GetProductQuery()
    // const P =  data.produc
    const FetchData =  async()=>{
      const res = await axios.get('https://dummyjson.com/products')
      const data =  res.data
      const items = data.products ? data.products.map((i:Product)=> i.brand) :[]
      const brands= [...new Set(items)] as Array<string>
      brands.pop()
      setBrand(brands)
    }
    useEffect(()=>{
       FetchData()
       console.log(brand)
    },[])
  return (
    <div>
          <Title >Shop By Brands</Title>
      <Carousel>
        <CarouselContent>
                {
                  brand && brand.map((item,idx:number)=>{
                    return <CarouselItem key={idx} className='basis-40'>
                               <Card className='h-full '>
                                    <CardContent className='h-full flex justify-center items-center'>
                                         <p className='text-center'>{item}</p>
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

export default SectionBrands
