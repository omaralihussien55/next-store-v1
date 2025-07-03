"use client"
import { Button } from '@/components/ui/button'
import { UpdateToCardQuery, useDeleteFromCart } from '@/reactQuery/cart/CartQuery'
import {  Cart, CartProduct } from '@/reactQuery/types'
import { Trash2 } from 'lucide-react'
import React, { FC } from 'react'
import {motion} from "framer-motion"
const ShopingCart:FC<{carts:Cart}> = ({carts}) => {

  return (
    <motion.div 
     initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
    className='w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 fixed top-20 right-[5%] md:right-5  h-[500px]  z-50 rounded-xl p-4  overflow-hidden bg-white shadow-lg'>
      <div className='w-full h-full flex justify-between flex-col '>
        <h1 className='p-1.5 text-center mb-2 text-gray-600'>Cart</h1>
        <div className='grow  overflow-y-scroll hover:custom-scrollbar'>
            {carts?.products.map((item:CartProduct,idx:number)=>{
              return <CartItem product={item} key={idx} />
            })}
       
        </div>
        <div className='h-[12%] sm:h-[14%] md:h-1/5'>
            <div className='mb-3 p-2'>
                <p className='flex items-center justify-between gap-1.5'><span className='text-gray-800 font-bold text-[12px] md:text-sm'>Total </span>
                <span className='text-[12px] md:text-sm text-gray-800'>${carts?.total.toFixed(2)}</span></p>
            </div>
            <Button className='bg-green-600 text-center hover:bg-green-500 w-full cursor-pointer'>Checkout</Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ShopingCart

const CartItem:FC<{product:CartProduct}> = ({product})=>{
  const {mutate:UpdateToCard} = UpdateToCardQuery()
  const { mutate: deleteItem } = useDeleteFromCart();
  const EditCard = (product:CartProduct,type:string)=>{
  
if(type == "increas"){
UpdateToCard({ ...product, quantity: product.quantity + 1 });
}else{
  if(product.quantity <= 1){
     // delete
     deleteItem(product.id)
  }else{
   UpdateToCard({ ...product, quantity: product.quantity - 1 });
  }

}
  

  }

    return <>
    <div className='w-full '>
          <div className='flex items-center gap-2 mb-2'>
            <div className='size-12 rounded-xl overflow-hidden border bg-gray-100'>
                <img src={product.thumbnail} alt='' className='w-full h-full' />
            </div>
            <div className=''>
                 <h2 className='text-gray-800 mb-1.5 font-semibold text-[12px] md:text-sm'>{product.title}</h2>
                 <p className='text-gray-500 text-[12px] md:text-sm'>${product.price.toFixed(2)} </p>
            </div>
          </div>

           
           <div className='flex items-center justify-between'>
              <div className='flex  items-center gap-2'>
                  <span className='text-[10px] md:text-sm text-gray-400 inline-block p-1 line-through'>${product.total.toFixed(2)}</span>
                  <span className='text-[10px] md:text-sm text-gray-800 font-bold inline-block '>${product.discountedTotal.toFixed(2)}</span>
                  <span className='text-[10px] md:text-sm  inline-block p-1 rounded-md bg-pink-300 text-pink-700'>{product.discountPercentage}%</span>
              </div>
              <div className='grow flex items-center justify-end gap-1.5'>
                   {product.quantity <=1 ?   <span onClick={()=> EditCard(product,"decreas")} className='p-1 cursor-pointer size-5 flex items-center justify-center bg-gray-100 
                    text-gray-600 rounded-sm'><Trash2 size={18} /></span> :   <span onClick={()=> EditCard(product,"decreas")} className='p-1 cursor-pointer size-5 flex items-center justify-center bg-gray-100  text-gray-600 rounded-sm'>-</span>}   
                
                    <span className='p-1 cursor-pointer size-5  flex items-center justify-center  text-gray-800 rounded-md'>{product.quantity}</span>
                    <span  onClick={()=> EditCard(product,"increas")} className='p-1 cursor-pointer size-5 flex items-center justify-center bg-gray-100 k text-gray-600 rounded-sm'>+</span>
                    
              </div>
           </div>
    </div>
    <hr className='my-2'/>
    </>
}
