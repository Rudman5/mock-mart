import { Link } from '@tanstack/react-router'
import type { Product } from '../api/types'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id.toString() }}
      className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer block"
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="font-bold text-lg leading-tight">{product.title}</h3>
      <div className="flex justify-between items-center mt-2">
        <p className="text-green-600 font-bold">${product.price}</p>
        <span className="text-xs text-gray-400">View Details →</span>
      </div>
    </Link>
  )
}
