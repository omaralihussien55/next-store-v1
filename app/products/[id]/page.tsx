import ProductDetails from '@/app/_ui/productComponent/ProductDetails'
import React from 'react'

export default  function ProductDetailsPage({ params }: { params: { id: string } }){


    return (
        <div>
            <ProductDetails id={params.id} />
        </div>
    )
}
