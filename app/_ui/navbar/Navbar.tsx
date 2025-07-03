"use client"
import React ,{useState} from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react';
import ShopingCart from './ShopingCart';
import { GetAllCartQuery } from '@/reactQuery/cart/CartQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleCart } from '@/redux/counterSlice';

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Company' },
    { id: 3, text: 'Resources' },
    { id: 4, text: 'About' },
    { id: 5, text: 'Contact' },
  ];

  return (
    <div className=' shadow  mx-auto p-2 fixed w-full z-[9999] top-0 left-0 '>
    <div className='flex justify-between items-center gap-4  '>
      {/* Logo */}
      <h1 className='  text-3xl font-bold text-[#00df9a]'>REACT.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex w-full'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-2 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden absolute top-1/2 right-1.5 -translate-y-1/2  '>
       {nav ? <X size={20} /> : <Menu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-2 border-b rounded-xl hover:bg-[#00df9a] duration-300 text-white cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
        <Search />
        <Cart />
        <div className='w-7'></div>
    </div>
    </div>
  );
};

export default Navbar;

const Search = ()=>{
    return(
        <div className=''>
            <input className='outline-0 px-4 py-2 w-36 hover:w-48 min-h-5 duration-500 border-0 bg-gray-100 rounded-2xl ' />
        </div>
    )
}


const Cart = ()=>{
  const {data} = GetAllCartQuery()
 const {openCart} = useAppSelector(state=> state.NavSlice)
 const dispatch = useAppDispatch()
    return (
      <>
        <div className='relative h-10 w-12 rounded-xl bg-gray-100 flex justify-center items-center'>
          <div className='absolute size-5 rounded-full bg-green-700 text-white text-[10px] flex justify-center items-center -top-1 right-0 '>{
          // data?.carts[data?.carts.lenght - 1]?.products.lenght
          data?.carts[data?.carts?.length -1]?.products?.length
          }</div>
          <span className="cursor-pointer" onClick={()=> dispatch(toggleCart(!openCart))}><ShoppingCart  size={20} /></span>

          
        </div>
     
      </>
      
    )
}