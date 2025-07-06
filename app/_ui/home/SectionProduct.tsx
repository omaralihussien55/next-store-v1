"use client"
import React, { FC, useEffect, useMemo, useRef } from 'react'
import Title from '../title/Title'
import { useInfiniteProducts} from '@/reactQuery/products/ProductsQuery'
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import { CartProduct, Product } from '@/reactQuery/types'
import { Button } from '@/components/ui/button'
import { RatingStars } from '../rating/RatingStar'
import { AddToCardQuery, GetAllCartQuery } from '@/reactQuery/cart/CartQuery'
import { useRouter } from 'next/navigation'
import Loader from '../loader/Loader'

const SectionProduct = () => {
const { data, fetchNextPage, hasNextPage,isLoading } = useInfiniteProducts();
  const { data: carts } = GetAllCartQuery();
  const carouselApi = useRef<CarouselApi | null>(null);

  const productsWithStatus = useMemo(() => {
    const products = data?.pages.flatMap((p) => p.products) ?? [];
    return products.map((product: Product) => {
      const isInCart = carts?.carts[0]?.products?.some(
        (cart: CartProduct) => cart.id === product.id
      );
      return { ...product, inCart: isInCart ?? false };
    });
  }, [data, carts]);

  // 🧠 load next page if last item is in view

 useEffect(() => {
  const embla = carouselApi.current;
  if (!embla) return;

  const handleSelect = () => {
    const lastIndex = embla.slideNodes().length - 1;
    const inView = embla.slidesInView();
    if (inView.includes(lastIndex) && hasNextPage) {
      fetchNextPage();
    }
  };

  embla.on("select", handleSelect);
  return () => {
    embla.off("select", handleSelect);
  };
}, [hasNextPage, fetchNextPage]);

  return (
    <div className='mb-12 '>
      <Title >Feature Products</Title>


<Carousel className=''
opts={{
          align: "start",
          dragFree: true,
        }}
        setApi={(api) => (carouselApi.current = api)}
>
  <CarouselContent className='gap-6 '>
    { productsWithStatus?.map((item:Product,idx:number)=>{
        return <CarouselItem key={idx} className="h-[200px] md:h-[300px] basis-40 md:basis-52 ">
            <CardItem item={item} aspect='aspect-square'/>
        </CarouselItem>
    })}
   
  </CarouselContent>
   {isLoading&&<span className="absolute top-1/2 left-1/2 -translate-1/2 ">
    <Loader />
    </span>}
   <CarouselPrevious className="left-4" />
    <CarouselNext className="right-4" />
</Carousel>
    </div>
  )
}

export default SectionProduct

export const CardItem:FC<{item:Product,aspect?:string}> = ({item,aspect=""})=>{
   const router = useRouter()
    const { mutate: addToCart } = AddToCardQuery();

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


    return <div className={`w-full relative h-full flex items-center justify-between flex-col gap-2  ${aspect} bg-white  rounded-2xl shadow-lg p-2`}>
             <span className='block absolute top-0 left-0 py-1 px-2 bg-pink-200 text-pink-800 rounded-tl-2xl rounded-br-2xl text-[10px] md:text-[12px] lg:text-sm'>{item.discountPercentage}%</span>
             <div className='w-full   h-[35%] md:h-[40%] overflow-hidden cursor-pointer' onClick={()=> router.push(`/products/${item.id}`)} >
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