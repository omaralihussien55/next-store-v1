import { NextRequest, NextResponse } from 'next/server';
import { CartProduct } from '@/reactQuery/types';
import { cart } from '../../data/cart';

type tParams = Promise<{ id: string }>;
export async function DELETE(
  req: NextRequest,
  { params }: { params: tParams }

) {
    
  const productId = parseInt((await params).id);
  const cartRef = cart.carts[0];

  const productIndex = cartRef.products.findIndex(
    (p: CartProduct) => p.id === productId
  );

  if (productIndex === -1) {
    return NextResponse.json(
      { message: 'Product not found in cart.' },
      { status: 404 }
    );
  }

  cartRef.products.splice(productIndex, 1);

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
