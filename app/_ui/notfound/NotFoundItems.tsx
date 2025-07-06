import { Box } from 'lucide-react'
import React from 'react'

const NotFoundItems = () => {
  return (
     <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <Box className="w-16 h-16 text-gray-400 mb-4" />
    <h2 className="text-xl font-semibold mb-2">No Products Available</h2>
      <p className="text-sm text-gray-400">Try changing the category or check back later.</p>
    </div>
  )
}

export default NotFoundItems
