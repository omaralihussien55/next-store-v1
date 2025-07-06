import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Order, OrderProduct } from "../types"


const getallorders = async ()=>{
    const res = await axios.get("/api/orders")

    return res.data
}

export const GetAllOrdersQuery = ()=>{
    return useQuery({
        queryKey:["orders"],
        queryFn:getallorders
    })
}

const orderbyid = async (id:string) =>{
    const res = await axios(`/api/orders/${id}`)
    return res.data()
}

export const GetOrderByIdQuery = (id:string)=>{
  return useQuery({
    queryKey:["order",id],
    queryFn:() => orderbyid(id),
    enabled:!!id

  })
}

const AddOrder = async (data:{products:OrderProduct[]})=>{
    const res = await axios.post("/api/orders",data)

    return res.data
}

export const AddOrderQuery = ()=>{
    const querclient = useQueryClient()
    return useMutation({
        mutationKey:["addorder"],
        mutationFn: AddOrder,
        onSuccess() {
              querclient.invalidateQueries({queryKey:["orders"]})
        },
    })
}

const UpdateOrder = async (data:{status:number,id:number})=>{
    const res = await axios.put("/api/orders",data)

    return res.data
}

export const UpdateOrderQuery = ()=>{
     const querclient = useQueryClient()
    return useMutation({
        mutationKey:["updateorder"],
        mutationFn: UpdateOrder,
         onSuccess() {
              querclient.invalidateQueries({queryKey:["orders"]})
        },
    })
}