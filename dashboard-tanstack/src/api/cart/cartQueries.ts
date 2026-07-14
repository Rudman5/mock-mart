import { queryOptions } from '@tanstack/react-query'
import { cartApi } from './cartApi'
import type { Cart } from '../types'

export const getCarts = () =>
  queryOptions({
    queryKey: ['carts'],
    queryFn: () => cartApi.getCarts(),
    staleTime: 1000 * 60 * 5,
  })

export const updateCartMutation = (id: number) => ({
  mutationFn: (data: Partial<Cart>) => cartApi.updateCart(id, data),
})
