import { Order } from "@/reactQuery/types";

export const  orders:Order[] = [
  {
    id: 1,
    userId: 33,
    products: [],
    status:0,
    total: 0,
    discountedTotal:0,
    date: new Date().toISOString(),
  },
];