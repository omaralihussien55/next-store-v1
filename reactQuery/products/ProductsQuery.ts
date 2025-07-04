import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {  Product } from "../types"


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


const getbyCategory = async(cat:string)=>{
  const url = cat === 'all'
      ? 'https://dummyjson.com/products'
      : `https://dummyjson.com/products/category/${cat}`;

   const res = await axios.get(url)

   return res.data
}

export const GetProductByCategory = (cat:string)=>{
  return useQuery({
    queryKey:["products",cat],
    queryFn:()=> getbyCategory(cat),
    enabled:!!cat
  })
}