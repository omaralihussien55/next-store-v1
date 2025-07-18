export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
  inCart?:boolean
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage?: number;
  discountedTotal: number;
  thumbnail: string;
}


export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface AddToCartProduct {
  id: number;       // product ID
  quantity: number;
}

export interface AddToCartPayload {
  userId: number;
  products: AddToCartProduct[];
}

export interface CartProductInput {
  id: number;
  title: string;
  price: number;
  quantity: number;
  discountPercentage: number;
  thumbnail: string;
}

export interface AddToCartPayloads {
  product: CartProductInput;
}

// interface CartProduct {
//   id: number;
//   quantity: number;
//   // ...
// }

// interface Cart {
//   products: CartProduct[];
// }

export interface AddToCartPayload {
  product: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    discountPercentage: number;
    thumbnail: string;
  };
}
export type OrderProduct = {
  id?: number;
  title?: string;
  price?: number;
  quantity?: number;
  discountPercentage?: number;
  thumbnail?: string;
};

// تعريف الطلب نفسه
export type Order = {
  id?: number;
  userId?: number;
  products: OrderProduct[];
  total?: number;
  discountedTotal?: number;
  date?: string | Date;
  status:number
};