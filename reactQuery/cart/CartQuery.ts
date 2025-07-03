import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {  AddToCartPayloads, CartProduct,} from "../types"


export const getAllCart = async()=>{
    const res = await axios.get("/api/carts")
    return res.data
}

export const GetAllCartQuery = ()=>{
    return useQuery({
        queryKey:["carts"],
        queryFn:getAllCart
    })
}

const addtocart = async(data: AddToCartPayloads)=>{
    const res = await axios.post("/api/carts",data)

    return res.data
}


export const AddToCardQuery = ()=>{
  const queryQulient = useQueryClient()
  return useMutation({
    mutationFn:addtocart,
    onSuccess:()=>{
        queryQulient.invalidateQueries({queryKey:["carts"]})
        queryQulient.invalidateQueries({queryKey:["products"]})
    }
  })
}



const updatetocart = async(data: CartProduct)=>{
    const res = await axios.put("/api/carts",{ product: data })
 
    return res.data
}


export const UpdateToCardQuery = ()=>{
  const queryQulient = useQueryClient()
  return useMutation({
    mutationFn:updatetocart,
    onSuccess:()=>{
        queryQulient.invalidateQueries({queryKey:["carts"]})
    }
  })
}


const deleteFromCart = async (productId: number) => {
  const res = await axios.delete(`/api/carts/${productId}`);
  return res.data;
};

export const useDeleteFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      queryClient.invalidateQueries({queryKey:["products"]})
    },
  });
};