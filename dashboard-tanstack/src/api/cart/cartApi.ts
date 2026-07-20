import type { Cart, CartsResponse, ShipmentStatus } from '../types'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const addDefaultStatuses = (carts: Cart[]): Cart[] =>
  carts.map((cart) => ({
    ...cart,
    status: cart.status ?? 'Pending',
  }))

export const cartApi = {
  getCarts: async (): Promise<CartsResponse> => {
    const res = await fetch('https://dummyjson.com/carts')
    if (!res.ok) throw new Error('Failed to fetch carts')
    const data = (await res.json()) as CartsResponse
    return {
      ...data,
      carts: addDefaultStatuses(data.carts),
    }
  },
  updateCart: async (id: number, cart: Partial<Cart>): Promise<Cart> => {
    const res = await fetch(`https://dummyjson.com/carts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cart),
    })
    if (!res.ok) throw new Error('Failed to update cart')
    return res.json()
  },

  setShipmentStatus: async (
    id: number,
    status: ShipmentStatus,
  ): Promise<Cart> => {
    await delay(400)

    return {
      id,
      products: [],
      total: 0,
      discountedTotal: 0,
      userId: 0,
      totalProducts: 0,
      totalQuantity: 0,
      status,
    } as Cart
  },
}
