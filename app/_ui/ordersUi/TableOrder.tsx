"use client"

import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { GetAllOrdersQuery } from '@/reactQuery/orders/OrderQuery'
import { date } from 'zod'
import { Order } from '@/reactQuery/types'
import { useRouter } from 'next/navigation'


const TableOrder = () => {
   const {data:orders ,isSuccess } = GetAllOrdersQuery()
   const Router = useRouter()
  return (
    <div>
         <Table className='bg-white'>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {isSuccess? orders?.map((item:Order,idx:number)=> {
        return     <TableRow key={idx}  onClick={()=> Router.push(`/orders/${item.id}`)}>
      <TableCell className="font-medium">#{item.id}</TableCell>
      <TableCell 
      className={`${item.status == 0 ? "text-red-500":"text-green-500"}`}
      >{item.status == 0 ? "No Paid":"Paid"}</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">${item?.total?.toFixed(2)}</TableCell>
    </TableRow>
    }):<></>}

  </TableBody>
</Table>
    </div>
  )
}

export default TableOrder
