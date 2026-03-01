import { queryOptions } from '@tanstack/react-query'
import { productApi } from './productFetch'

export const productQueries = {
  getProducts: () =>
    queryOptions({
      queryKey: ['products'],
      queryFn: () => productApi.getProducts(),
      staleTime: 1000 * 60 * 5,
    }),

  getProductDetails: (id: string) =>
    queryOptions({
      queryKey: ['products', id],
      queryFn: () => productApi.getProductById(id),
    }),
}
