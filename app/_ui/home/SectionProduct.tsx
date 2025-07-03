"use client"
import React, { FC, useMemo } from 'react'
import Title from '../title/Title'
import { GetProductQuery } from '@/reactQuery/products/ProductsQuery'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { CartProduct, Product } from '@/reactQuery/types'
import { Button } from '@/components/ui/button'
import { RatingStars } from '../rating/RatingStar'
import { AddToCardQuery, GetAllCartQuery } from '@/reactQuery/cart/CartQuery'

const SectionProduct = () => {
    const {data} = GetProductQuery()
    const {data:carts} = GetAllCartQuery()
 

    const productsWithStatus = useMemo(() => {
  return data?.products?.map((product: Product) => {
    const isInCart = carts?.carts[0]?.products?.some(
      (cart: CartProduct) => cart.id === product.id
    );
    return { ...product, inCart: isInCart ?? false };
  }) || [];
}, [data, carts]);
  return (
    <div className='mb-12 '>
      <Title >Feature Products</Title>


<Carousel className=''>
  <CarouselContent className='gap-6'>
    { productsWithStatus?.map((item:Product,idx:number)=>{
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

export const CardItem:FC<{item:Product}> = ({item})=>{

    const { mutate: addToCart ,isSuccess} = AddToCardQuery();

const handleAdd = (product: Product) => {
  addToCart({
    product: {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
    },
  });
};


    return <div className='w-full h-full flex items-center justify-between flex-col gap-2 aspect-square bg-white  rounded-2xl shadow-lg p-2'>
             <div className='w-full   h-[35%] md:h-[40%] overflow-hidden'>
                <img src={item.thumbnail} alt="" className='h-full w-full' />
             </div>
             <div className='w-full h-[65%] md:h-[60%]  flex flex-col justify-between  '>
                 <RatingStars rating={item.rating} />
                 <h2 className='p-1 mb-1 text-gray-700 font-bold text-[10px] md:text-sm'>{item.title.slice(0, 15)}</h2>
                 <h3 className='p-1 mb-1 text-gray-400 text-[10px] md:text-sm'>{item.description.slice(0, 29)}</h3>
                 <div className='flex items-end  justify-between gap-2 mb-2'>
                   
                    <Button 
                    style={{pointerEvents:item.inCart?"none":"all"}}
                    onClick={()=> handleAdd(item)} className='w-full  flex justify-between items-center px-4 py-2 bg-green-400 hover:bg-green-300
                     cursor-pointer text-[11px] md:text-sm'>
                      
                      <span >{item.inCart?"incard":"Add to card"}</span>
                       <span className='font-semibold text-green-900'>{item.price} <span className=''>$</span></span>
                      </Button>
                 </div>
             </div>
    </div>
}