"use client"
import { GetByIdQuery } from '@/reactQuery/products/ProductsQuery'
import React, { FC, useMemo, useState } from 'react'
import { RatingStars } from '../rating/RatingStar'
import { Button } from '@/components/ui/button'
import { AddToCardQuery, GetAllCartQuery, UpdateToCardQuery } from '@/reactQuery/cart/CartQuery'
import { CartProduct, Product } from '@/reactQuery/types'

const ProductDetails:FC<{id:string}> = ({id}) => {
    const [count,setCount] = useState(1)
    const [index,setIndex] = useState(0)
    const {data:products} = GetByIdQuery(id)
    const {data:carts}= GetAllCartQuery()
  const {mutate:UpdateToCard} = UpdateToCardQuery()
      const { mutate: addToCart } = AddToCardQuery();

    const isInCart = useMemo(() => {
  return carts?.carts[0]?.products.some((i: Product) => i.id === products?.id);
}, [carts, products]);
    
 const finditem= useMemo(() => {
  return carts?.carts[0]?.products.find((i: Product) => i.id === products?.id);
}, [carts, products]);

const finalPrice = useMemo(() => {
  if (!products) return null;
  const discount = (products.price * products.discountPercentage) / 100;
  return products.price - discount;
}, [products]);


  const EditCard = (product:CartProduct,type:string)=>{
   
if(type == "increas"){
    if(isInCart){
       UpdateToCard({ ...product, quantity: product.quantity + 1 });
    }else{
        setCount(p => p+= 1)
    }

}else{

    if(isInCart){
       if(product.quantity <= 1){
     // delete
    //  deleteItem(product.id)
  }else{
   UpdateToCard({ ...product, quantity: product.quantity - 1 });
  }
    }else{
        if(count <= 1){

        }else{
            setCount(p => p-1)
        }
    }
 

}
  

  }


  
  const handleAdd = (product: Product) => {
    addToCart({
      product: {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: count,
        discountPercentage: product.discountPercentage,
        thumbnail: product.thumbnail,
      },
    });
  };
  return (
    <div className='lg:w-[75%] w-full mx-auto'>
      <div className='flex justify-between flex-wrap'>
             <div className='w-full md:w-1/2 min-h-80 p-3'>
              <div className=' h-full flex gap-1 '>
                <div className='w-14'>
                    {
                        products?.images.map((item:string,idx:number)=>{
                            return <div key={idx} className='w-full h-14 rounded-xl bg-white  overflow-hidden mb-1.5' onClick={()=> setIndex(idx)}>
                                 <img src={item} className='w-full h-full' alt='' />
                            </div>
                        })
                    }
                </div>
                <div className='grow overflow-hidden bg-white rounded-xl'>
                   <img src={products?.images[index]} className='w-full h-full' alt='' />
                </div>
              </div>
             </div>

             {/*  */}
             {products&& <div className='w-full md:w-1/2 p-3 '>
             <div className='bg-white rounded-2xl h-full p-3 flex flex-col justify-between'>
                <div className='flex items-center gap-2 mb-3'>
                    <h1 className='font-bold text-gray-800 grow'>{products?.title}</h1>
                    <div className='text-gray-600 flex gap-1.5 '>
                        <span className="line-through">${products?.price}</span>
                        <span className='text-green-700'>${finalPrice?.toFixed(2)}</span>
                        <span className='text-pink-800 bg-pink-200 px-2 py-1 text-[10px] md:text-sm rounded-md'>{products?.discountPercentage}%</span>
                    </div>
                </div>
                {/*  */}
                 <RatingStars rating={Number(products?.rating)} />

                 <p className='text-gray-400 my-4'>{products?.description}</p>
                 <div className='grow'></div>
                 <div className='flex items-center gap-1 mb-3'
                 
                 >
                    <span   onClick={()=> {
                            EditCard(finditem,"descraes")
                        
                    }}  className=" size-8 rounded-lg bg-gray-100 flex justify-center items-center cursor-pointer">-</span>
                    <span className=" size-8 rounded-lg  flex justify-center items-center">{isInCart? finditem?.quantity:count}</span>
                    <span onClick={()=> {
                            EditCard(finditem,"increas")
                        
                    }} className="  size-8 rounded-lg bg-gray-100 flex justify-center items-center cursor-pointer">+</span>
                 </div>

                 <Button style={{
                    pointerEvents:isInCart?"none":"all"


                 }} onClick={()=> handleAdd(products)} className='w-full bg-green-600 hover:bg-green-500 cursor-pointer'>{isInCart?"inCart":"Add To Cart"}</Button>
             </div>
             </div>}
      </div>
    </div>
  )
}

export default ProductDetails
