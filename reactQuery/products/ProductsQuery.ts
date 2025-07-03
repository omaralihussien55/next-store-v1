import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { CartProduct, Product } from "../types"
import {  GetAllCartQuery } from "../cart/CartQuery"


const getProducts = async()=>{
    const res = await axios.get("https://dummyjson.com/products")
    return res.data
}

export const GetProductQuery = ()=>{
    return useQuery({
        queryKey:["products"],
        queryFn:getProducts
    })
}

const getbyId = async(id:number | string):Promise<Product> =>{
    const res = await axios.get(`https://dummyjson.com/products/${id}`)

    return res.data
}

export const GetByIdQuery = (id:number | string)=>{
 return useQuery({
    queryKey:["product",id],
    queryFn:()=> getbyId(id),
    enabled:!!id
 })
}


export const useProductsWithCartStatus = () => {
  const { data: products, isLoading: loadingProducts } = GetProductQuery()

  const { data: cart, isLoading: loadingCart } = GetAllCartQuery()

  const productsWithStatus = products?.map((product: Product) => {
    const isInCart = cart?.products?.some(
      (item: CartProduct) => item.id === product.id
    );

    return {
      ...product,
      inCart: isInCart ?? false, // إذا لم يكن موجودًا تعتبره false
    };
  });

  return {
    products: productsWithStatus,
    isLoading: loadingProducts || loadingCart,
  };
};
