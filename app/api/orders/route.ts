import { NextRequest, NextResponse } from "next/server";
import { orders } from "../data/orders";
import { CartProduct } from "@/reactQuery/types";

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ✅ التحقق من وجود userId والمنتجات
    const {  products } = body;
   const userId = 33
    if (!userId || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { message: "Invalid order data. 'userId' and 'products' are required." },
        { status: 400 }
      );
    }

    // ✅ التحقق من صحة كل منتج
    const validProducts = products.every((product: CartProduct) =>
      product.id && product.title && product.price && product.quantity
    );

    if (!validProducts) {
      return NextResponse.json(
        { message: "Each product must include id, title, price, and quantity." },
        { status: 400 }
      );
    }

  
    const total = products.reduce(
      (sum: number, p: CartProduct) => sum + p.price * p.quantity,
      0
    );

    const discountedTotal = products.reduce((sum: number, p: CartProduct) => {
      const total = p.price * p.quantity;
      return sum + total - (total * (p.discountPercentage || 0)) / 100;
    }, 0);

   
    const newOrder = {
      id: orders.length + 1,
      userId,
      products,
      total,
      discountedTotal,
      status:0,
      date: new Date().toISOString(),
    };

    orders.push(newOrder);

    return NextResponse.json(
      { message: "Order created successfully", order: newOrder ,status: 201 },
     
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      {  }
    );
  }
}


export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    // ✅ تحقق من وجود id و status
    if (typeof id !== "number" || typeof status !== "number") {
      return NextResponse.json(
        { message: "Both 'id' and 'status' are required and must be numbers." },
        { status: 400 }
      );
    }

    // ✅ ابحث عن الطلب
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
     return NextResponse.json({ message: "Order not found." }, { status: 404 });
    }

    // ✅ تحديث status فقط
    orders[orderIndex].status = status;
    orders[orderIndex].date = new Date().toISOString(); 

    return NextResponse.json({
      message: "Order status updated successfully",
      order: orders[orderIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}