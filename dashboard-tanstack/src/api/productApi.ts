import type { ProductsResponse, Product, ProductId } from './types'

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
  updateProduct: async (
    id: ProductId,
    data: Partial<Product>,
  ): Promise<Product> => {
    data = { ...data, id: id.toString() }
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error(`Failed to update product ${id}`)
    return res.json()
  },
  getCategories: async (): Promise<string[]> => {
    const res = await fetch('https://dummyjson.com/products/category-list')
    if (!res.ok) throw new Error('Failed to fetch categories')
    return res.json()
  },
}
