"use client"
import React ,{useState} from 'react'
import { Menu, ShoppingCart, X } from 'lucide-react';

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
    <div className='bg-white shadow flex justify-between items-center   mx-auto p-2 gap-4 '>
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
      <div onClick={handleNav} className='block md:hidden'>
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
            className='p-2 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}
      </ul>
        <Search />
        <Cart />
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
    return (
        <div>
          <ShoppingCart  size={24} />
        </div>
    )
}