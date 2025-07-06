import OrderDetails from '@/app/_ui/ordersUi/OrderDetails'
import React from 'react'

type tParams = Promise<{ id: string }>;
export default async function page ({ params }: { params: tParams }){
 const slug = await params;
  const productID = slug.id;
  return (
    <div>
      <OrderDetails id={productID} />
    </div>
  )
}


