import { NextRequest, NextResponse } from 'next/server';
import {  Order } from '@/reactQuery/types';
import { orders } from '../../data/orders';

type tParams = Promise<{ id: string }>;
export async function GET(
  req: NextRequest,
  { params }: { params: tParams }

) {
    
  // const productId = parseInt((await params).id);

  const order = orders.find((p:Order) => p.id == 3 );
console.log("vv",order)
  return NextResponse.json({ message: 'success to get order.', order });
}
