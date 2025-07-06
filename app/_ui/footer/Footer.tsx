import {  Facebook, Instagram, Linkedin, LinkIcon } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white px-4 py-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand + Description */}
        <div>
          <h2 className="text-xl font-bold mb-3">SmartKart</h2>
          <p className="text-sm text-gray-400">
            Your smart choice for online shopping. Best deals, top products, and fast delivery.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/products" className="hover:underline">Products</Link></li>
            <li><Link href="/orders" className="hover:underline">orders </Link></li>
            {/* <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li> */}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Newsletter</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe to get the latest deals and updates.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="p-2 rounded bg-gray-800 text-white text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 p-2 rounded text-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-gray-300">
            <a href="https://www.facebook.com/profile.php?id=100006160620281" target="_blank" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="https://www.facebook.com/profile.php?id=100006160620281" target="_blank"  aria-label="Instagram"><Instagram size={20} /></a>
            <a href="https://www.linkedin.com/in/omar-ali-22a43222a" target="_blank" aria-label="Twitter"><Linkedin size={20} /></a>
            <a href="https://prtoflionextv2.vercel.app/" target="_blank"  aria-label="chrome"><LinkIcon size={20} /></a>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-800 pt-4">
        © 2025 SmartKart. All rights reserved.
        <div className="mt-2">created by omar Ali</div>
      </div>
    </footer>
  )
}
