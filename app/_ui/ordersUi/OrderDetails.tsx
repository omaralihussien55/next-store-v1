"use client"
import { GetAllOrdersQuery, UpdateOrderQuery } from '@/reactQuery/orders/OrderQuery'
import React, { FC } from 'react'
import PayMent from '../checkout/PayMent'
import Successfull from '../checkout/Successfull'
import { Order } from '@/reactQuery/types'
import { Button } from '@/components/ui/button'

const OrderDetails:FC<{id:string}> = ({id}) => {
    // const {data:order} = GetOrderByIdQuery(id)
       const {data:orders  } = GetAllOrdersQuery()
  const updateOrder = UpdateOrderQuery()
  const order = orders?.find((i:Order)=> i.id == Number(id))
      const currentStatus = order?.status 
 const handleOrderFlow = () => {

  
  if (currentStatus === 0) {
    updateOrder.mutate({ status: 1, id: order?.id })
    return
  }

  if (currentStatus === 1) {
     updateOrder.mutate({ status: 2, id: order?.id })
    // router.push("/products") 
    // patchorder.mutate()
    
    return
  }

 
}


  const getHeaderLabel = () => {
    if (!order) return "Order"
    if (currentStatus === 0) return "Payment Method"
    if (currentStatus === 1) return "Confirmation"
    return "Order"
  }

  const getButtonLabel = () => {
    if ( updateOrder.isPending) return "Processing..."
    if (!order) return "Checkout"
    if (currentStatus === 0) return "Pay"
    if (currentStatus === 1) return "Continue ..."
    if (currentStatus === 2) return "Paid"
    return "Checkout"
  }

  const renderCartContent = () => {
  if (!order) {
    return <div className='my-20 p-10 flex justify-center items-center '>
        the order not found
    </div>
  }

  if (currentStatus === 0) {
    return <PayMent newOrder={order} />
  }

  if (currentStatus === 1) {
    return <Successfull num={order?.id} />
  }

  if(currentStatus === 2){
    return <div>
            <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-gray-400">id</span>
        <span className="text-gray-900 font-bold"># {order?.id}</span>
      </div>

       <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-gray-400">discount</span>
        <span className="text-gray-900 font-bold">${(order?.total && order?.discountedTotal) && (order?.total - order?.discountedTotal).toFixed(2)}</span>
      </div>

    <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-gray-400">Total</span>
        <span className="text-gray-900 font-bold">${order?.total?.toFixed(2)}</span>
      </div>

        <div className="flex items-center justify-between gap-2">
        <span className="text-gray-400">Status</span>
        <span className="text-gray-900 font-bold">{order.status == 0 ? "No Paid":"Paid"}</span>
      </div>
    </div>
  }

  return null
}

  return (
    <div className=''>
      <div className='w-full sm:w-3/4 md:1/2 mx-auto bg-white p-3 rounded-2xl'>
          <h1 className='p-1.5 text-center mb-2 text-green-700 font-bold'>
          {getHeaderLabel()}
        </h1>

        <div>
            {renderCartContent()}
        </div>
          
          <div className='mt-8 mb-2'>
             <Button

            onClick={() => handleOrderFlow()}
            className={`bg-green-600 hover:bg-green-500 w-full ${currentStatus === 2 ? "pointer-events-none bg-gray-100 text-gray-800":"pointer-events-auto"}`}
          >
            {getButtonLabel()}
          </Button>
          </div>
      </div>
    </div>
  )
}

export default OrderDetails
