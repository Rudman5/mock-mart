import type { ProductsResponse, Product } from './types'

export const productApi = {
  getProducts: async (): Promise<ProductsResponse> => {
    const res = await fetch('https://dummyjson.com/products')
    if (!res.ok) throw new Error('Failed to fetch products')
    return res.json()
  },

  getProductById: async (id: string): Promise<Product> => {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) throw new Error(`Product ${id} not found`)
    return res.json()
  },
}
