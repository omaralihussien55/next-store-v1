"use client"
import { Button } from '@/components/ui/button'
import { PatchCartDeletQuery, UpdateToCardQuery, useDeleteFromCart } from '@/reactQuery/cart/CartQuery'
import {  Cart, CartProduct, OrderProduct } from '@/reactQuery/types'
import { Trash2 } from 'lucide-react'
import React, { FC, useEffect, useRef } from 'react'
import {motion} from "framer-motion"
import { useRouter } from 'next/navigation'
import { AddOrderQuery, UpdateOrderQuery } from '@/reactQuery/orders/OrderQuery'
import PayMent  from '../checkout/PayMent'
import Successfull from '../checkout/Successfull'
import { useAppDispatch } from '@/redux/hooks'
import { toggleCart } from '@/redux/counterSlice'

const ShopingCart: FC<{ carts: Cart }> = ({ carts }) => {
  const router = useRouter()
  const ref = useRef<any>(null)
  const dispatch = useAppDispatch()
  const { mutate: addOrder, isPending, isSuccess, data: newOrder } = AddOrderQuery()
  
  const updateOrder = UpdateOrderQuery()
  const patchorder = PatchCartDeletQuery()

  const currentOrder =updateOrder?.data?.order ? updateOrder?.data?.order : newOrder?.order
  const currentStatus = currentOrder?.status // 0 | 1 | 2

 const handleOrderFlow = (products: OrderProduct[]) => {

  if (!newOrder?.order) {
    addOrder({ products })
    return
  }

  if (currentStatus === 0) {
    updateOrder.mutate({ status: 1, id: currentOrder.id })
    return
  }

  if (currentStatus === 1) {
     updateOrder.mutate({ status: 2, id: currentOrder.id })
    router.push("/products")
    patchorder.mutate()
    console.log("pach",patchorder.data)
    dispatch(toggleCart(false))
    
    return
  }

 
}


  const getHeaderLabel = () => {
    if (!currentOrder) return "Cart"
    if (currentStatus === 0) return "Payment Method"
    if (currentStatus === 1) return "Confirmation"
    return "Cart"
  }

  const getButtonLabel = () => {
    if (isPending || updateOrder.isPending) return "Processing..."
    if (!currentOrder) return "Checkout"
    if (currentStatus === 0) return "Pay"
    if (currentStatus === 1) return "Continue Shopping"
    return "Checkout"
  }

  const renderCartContent = () => {
  if (!currentOrder) {
    return carts?.products.map((item: CartProduct, idx: number) => (
      <CartItem product={item} key={idx} />
    ))
  }

  if (currentStatus === 0) {
    return <PayMent newOrder={currentOrder} />
  }

  if (currentStatus === 1) {
    return <Successfull num={currentOrder.id} />
  }

  return null
}

// useEffect(()=>{
//  if(currentStatus === 2){
//    patchorder.mutate()
//  }
// },[currentStatus])


 useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        dispatch(toggleCart(false)) 
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])



  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='w-[90%] sm:w-1/2 lg:w-1/3 fixed top-20 right-[5%] md:right-5 h-[500px] z-50 rounded-xl p-4 overflow-hidden bg-white shadow-lg'
    ref={ref}
   >
      <div className='w-full h-full flex flex-col justify-between'>
        <h1 className='p-1.5 text-center mb-2 text-green-700 font-bold'>
          {getHeaderLabel()}
        </h1>

        <div className='grow overflow-y-scroll hover:custom-scrollbar'>
        {renderCartContent()}
        </div>

        <div className='h-1/5'>
          {currentStatus !== 2 && (
            <div className='mb-3 p-2'>
              <p className='flex items-center justify-between gap-1.5'>
                <span className='text-gray-800 font-bold text-[12px] md:text-sm'>Total</span>
                <span className='text-[12px] md:text-sm text-gray-800'>
                  ${carts?.total.toFixed(2)}
                </span>
              </p>
            </div>
          )}

          <Button
            onClick={() => handleOrderFlow(carts.products)}
            className='bg-green-600 hover:bg-green-500 w-full'
          >
            {getButtonLabel()}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default ShopingCart

const CartItem:FC<{product:CartProduct}> = ({product})=>{
  const router = useRouter()
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
    <div className='w-full ' >
          <div className='flex items-center gap-2 mb-2 cursor-pointer' onClick={()=> router.push(`/products/${product.id}`)}>
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
                   {product.quantity <=1 ?   <span onClick={()=> EditCard(product,"decreas")} className='p-1 cursor-pointer size-7 flex items-center justify-center bg-gray-100 
                    text-gray-600 rounded-sm'><Trash2 size={18} /></span> :   <span onClick={()=> EditCard(product,"decreas")} className='p-1 cursor-pointer size-7 flex items-center justify-center bg-gray-100  text-gray-600 rounded-sm'>-</span>}   
                
                    <span className='p-1 cursor-pointer size-5  flex items-center justify-center  text-gray-800 rounded-md'>{product.quantity}</span>
                    <span  onClick={()=> EditCard(product,"increas")} className='p-1 cursor-pointer size-7 flex items-center justify-center bg-gray-100 k text-gray-600 rounded-sm'>+</span>
                    
              </div>
           </div>
    </div>
    <hr className='my-2'/>
    </>
}
