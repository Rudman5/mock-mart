import type { ProductsResponse, Product, ProductId } from './types'

export const productApi = {
  createProduct: async (data: Partial<Product>): Promise<Product> => {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error('Failed to create product')
    return res.json()
  },
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
