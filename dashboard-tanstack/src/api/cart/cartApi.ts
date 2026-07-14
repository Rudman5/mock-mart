import type { Cart, CartsResponse } from '../types'

export const cartApi = {
  getCarts: async (): Promise<CartsResponse> => {
    const res = await fetch('https://dummyjson.com/carts')
    if (!res.ok) throw new Error('Failed to fetch carts')
    return res.json()
  },
  updateCart: async (id: number, cart: Partial<Cart>): Promise<Cart> => {
    const res = await fetch(`https://dummyjson.com/carts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cart),
    })
    if (!res.ok) throw new Error('Failed to update cart')
    return res.json()
  },
}
