import { queryOptions } from '@tanstack/react-query'
import { productApi } from './productApi'
import type { Product, ProductId } from './types'

export const getProducts = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: () => productApi.getProducts(),
    staleTime: 1000 * 60 * 5,
  })

export const getProductDetails = (id: string) =>
  queryOptions({
    queryKey: ['products', id],
    queryFn: () => productApi.getProductById(id),
  })

export const updateProductMutation = (id: ProductId) => ({
  mutationFn: (data: Partial<Product>) => productApi.updateProduct(id, data),
})
