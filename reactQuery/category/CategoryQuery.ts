
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Product } from "../types"


const getcategory = async()=>{
    const res = await axios.get("https://dummyjson.com/products/categories")
    return res.data
}

export const GetCategoryQuery = ()=>{
    return useQuery({
        queryKey:["categories"],
        queryFn:getcategory
    })
}

const getbyIdcategory = async(id:number | string):Promise<Product> =>{
    const res = await axios.get(`https://dummyjson.com/products/${id}`)

    return res.data
}

export const GetByIdCategoryQuery = (id:number | string)=>{
 return useQuery({
    queryKey:["product",id],
    queryFn:()=> getbyIdcategory(id),
    enabled:!!id
 })
}