import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import axios from "axios"
import {  Product } from "../types"


const getProducts = async ({ pageParam }: { pageParam: number })=>{
    const res = await axios.get(`https://dummyjson.com/products?limit=10&skip=${pageParam}`)
    return res.data
}
export const useInfiniteProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) => getProducts({ pageParam }), 
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextSkip = pages.length * 10;
      return nextSkip >= lastPage.total ? undefined : nextSkip;
    },
    
  });
};


// export const GetProductQuery = ()=>{
//     return useQuery({
//         queryKey:["products"],
//         queryFn:getProducts
//     })
// }

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


// const getbyCategory = async(cat:string)=>{
//   const url = cat === 'all'
//       ? 'https://dummyjson.com/products'
//       : `https://dummyjson.com/products/category/${cat}`;

//    const res = await axios.get(url)

//    return res.data
// }



type GetByCategoryOptions = {
  category: string;
  limit?: number;
  skip?: number;
};

export const getByCategory = async ({
  category,
  limit = 10,
  skip = 0,
}: GetByCategoryOptions) => {
  const baseUrl = "https://dummyjson.com/products";
  const url =
    category === "all"
      ? `${baseUrl}?limit=${limit}&skip=${skip}`
      : `${baseUrl}/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`;

  const res = await axios.get(url);
  return res.data; 
};
export const GetProductByCategory = (
  category: string,
  page: number = 1,
  pageSize = 10
)=>{

 const safePage = isNaN(page) || page < 1 ? 1 : page;
  const skip = (safePage - 1) * pageSize; 

  return useQuery({
    queryKey:["products",category, page],
    queryFn:()=> getByCategory({ category, limit: pageSize, skip }),
    
  })
}