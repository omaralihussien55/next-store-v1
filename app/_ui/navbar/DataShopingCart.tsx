"use client"
import React from 'react'
import ShopingCart from './ShopingCart'
import { GetAllCartQuery } from '@/reactQuery/cart/CartQuery'
import { useAppSelector } from '@/redux/hooks'
import {AnimatePresence} from "framer-motion"
const DataShopingCart = () => {
      const {data} = GetAllCartQuery()
      const {openCart} = useAppSelector(state=> state.NavSlice)
  return (
    <>
     <AnimatePresence mode="wait">
        {openCart?<ShopingCart carts={ data?.carts[data?.carts?.length -1]} />:<></>}
     </AnimatePresence>
       
    </>

  )
}

export default DataShopingCart
