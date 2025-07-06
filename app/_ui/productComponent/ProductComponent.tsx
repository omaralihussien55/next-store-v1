"use client"
import React, { useMemo } from 'react'
import SelectCategory from './selectCategory'
import { GetCategoryQuery } from '@/reactQuery/category/CategoryQuery'
import { GetProductByCategory } from '@/reactQuery/products/ProductsQuery'
import { GetAllCartQuery } from '@/reactQuery/cart/CartQuery'
import { CartProduct, Product } from '@/reactQuery/types'
import { CardItem } from '../home/SectionProduct'
import { useAppSelector } from '@/redux/hooks'
import PaginationProducts from './PaginationProducts'
import Loader from '../loader/Loader'
import NotFoundItems from '../notfound/NotFoundItems'


const ProductComponent = () => {
    const {valueCategory,page,pageSize} = useAppSelector(state=> state.NavSlice)
    const {data:categories } = GetCategoryQuery()
    const {data:products,isLoading} = GetProductByCategory(valueCategory,page,pageSize)
      const {data:carts} = GetAllCartQuery()

        const productsWithStatus = useMemo(() => {
        return products?.products?.map((product: Product) => {
          const isInCart = carts?.carts[0]?.products?.some(
            (cart: CartProduct) => cart.id === product.id
          );
          return { ...product, inCart: isInCart ?? false };
        }) || [];
      }, [products, carts]);

       const totalPages = Math.ceil((products?.total || 0) / pageSize);

       console.log("pr",productsWithStatus)

  return (
    <div>
       <div className='flex justify-between  flex-wrap'>
          <div className='w-full   md:w-1/3 lg:w-1/4 p-3 md:h-screen'>
            <SelectCategory categories={categories}  />
          </div>
          <div className=' grow w-full   md:w-2/3 lg:w-3/4 p-3 '>
             <div className='flex flex-wrap gap-2.5 justify-center'>
                {isLoading ? <><Loader /></>:<>
                {productsWithStatus?.length > 0 ? productsWithStatus?.map((item:Product,idx:number)=>{
                    return <div key={idx} className='h-[200px] md:h-[300px] basis-1/5  '>
                        <CardItem  item={item} 
                        aspect=''
                        
                        />
                    </div>
                 }):<>
                 <NotFoundItems />
                 </>}
                </>} 
             </div>
          
             <div className='my-10'>
                <PaginationProducts totalPage={totalPages} />
             </div>

          </div>
       </div>
    </div>

  )
}

export default ProductComponent


