
import { AddToCartPayload, AddToCartPayloads, CartProduct } from '@/reactQuery/types';
import { NextRequest, NextResponse } from 'next/server'
import { cart } from '../data/cart';



export async function GET() {
  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const body: AddToCartPayloads = await req.json();
  const newProduct = body.product;

  const cartRef = cart.carts[0];

  // تحقق إذا كان المنتج موجود بالفعل
  const existing = cartRef.products.find(
    (p: CartProduct) => p.id === newProduct.id
  );

  if (existing) {
    existing.quantity += newProduct.quantity;
    existing.total = existing.price * existing.quantity;
    existing.discountedTotal =
      existing.total - (existing.total * existing.discountPercentage) / 100;
  } else {
    const total = newProduct.price * newProduct.quantity;
    const discountedTotal =
      total - (total * newProduct.discountPercentage) / 100;

    cartRef.products.push({
      ...newProduct,
      total,
      discountedTotal,
    });
  }

  // تحديث بيانات الكارت العامة
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

  return NextResponse.json({ message: 'Added to cart', cart });
}



export async function PUT(req: NextRequest) {
  const body: AddToCartPayload = await req.json();
  const updatedProduct = body.product;

  const cartRef = cart.carts[0];

  // ابحث عن المنتج
  const existing = cartRef.products.find(
    (p: CartProduct) => p.id === updatedProduct.id
  );

  if (!existing) {
    return NextResponse.json(
      { message: 'Product not found in cart, cannot update.' },
      { status: 404 }
    );
  }

  // ✅ تحديث الكمية والخصم
  existing.quantity = updatedProduct.quantity;
  existing.total = existing.price * existing.quantity;
  existing.discountedTotal =
    existing.total - (existing.total * existing.discountPercentage) / 100;

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

  return NextResponse.json({ message: 'Product updated successfully.', cart });
}


export async function PATCH() {

      cart.carts[0].products = [] 
      cart.carts[0].total= 0;
      cart.carts[0].discountedTotal=0;
      cart.carts[0].totalProducts = 0;
      cart.carts[0].totalQuantity= 0;
  return NextResponse.json({ message: 'Product patche successfully.', cart });
}