import { CartProduct } from "@/reactQuery/types";
import { NextRequest, NextResponse } from "next/server";
import { cart } from "../route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // const { productId }: { productId: number } = await req.json();
  const productId = parseInt(params.id);
  const cartRef = cart.carts[0];

  // تحقق إن المنتج موجود
  const productIndex = cartRef.products.findIndex(
    (p: CartProduct) => p.id === productId
  );

  if (productIndex === -1) {
    return NextResponse.json(
      { message: 'Product not found in cart.' },
      { status: 404 }
    );
  }

  // ✅ إزالة المنتج
  cartRef.products.splice(productIndex, 1);

  // ✅ تحديث بيانات الكارت العامة
  cartRef.total = cartRef.products.reduce((acc, p) => acc + p.total, 0);
  cartRef.discountedTotal = cartRef.products.reduce(
    (acc, p) => acc + p.discountedTotal,
    0
  );
  cartRef.totalProducts = cartRef.products.length;
  cartRef.totalQuantity = cartRef.products.reduce(
    (acc, p) => acc + p.quantity,
    0
  );

  return NextResponse.json({ message: 'Product removed from cart.', cart });
}