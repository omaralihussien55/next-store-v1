import ProductDetails from '@/app/_ui/productComponent/ProductDetails'
import React from 'react'

type tParams = Promise<{ id: string }>;
export default async function  DetailsPge({ params }: { params: tParams }){
 const slug = await params;
  const productID = slug.id;
    return (
        <div>
            <ProductDetails id={productID} />
        </div>
    )
}
