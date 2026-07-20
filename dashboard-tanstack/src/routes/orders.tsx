import { createFileRoute } from '@tanstack/react-router'
import { Button, Heading, Modal, Table, Chip } from '@heroui/react'
import type { Cart, ShipmentStatus } from '@/api/types'

import { ROWS_PER_PAGE } from '@/constants'
import { getCarts } from '@/api/cart/cartQueries'
import PaginatedTable from '@/components/PaginatedTable'
import { useState } from 'react'
import { cartApi } from '@/api/cart/cartApi'

type CartSearch = {
  page: number
}

export const Route = createFileRoute('/orders')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getCarts()),
  component: OrderPage,
  validateSearch: (search: Record<string, number>): CartSearch => ({
    page: search.page || 1,
  }),
})

function OrderPage() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCart, setSelectedCart] = useState<Cart | null>(null)
  const [carts, setCarts] = useState<Cart[]>(data.carts)

  const handleShipment = async (status: ShipmentStatus) => {
    if (!selectedCart) return

    try {
      const updatedCart = await cartApi.setShipmentStatus(
        selectedCart.id,
        status,
      )
      setCarts((prev) =>
        prev.map((cart) =>
          cart.id === selectedCart.id
            ? { ...cart, status: updatedCart.status ?? status }
            : cart,
        ),
      )
      setSelectedCart(updatedCart)
    } finally {
      setIsModalOpen(false)
    }
  }

  return (
    <div className="gap-4 p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Orders</h2>
      </div>
      <div className="flex items-center justify-between mb-4"></div>
      <PaginatedTable
        items={carts}
        rowsPerPage={ROWS_PER_PAGE}
        ariaLabel="Carts"
        search={search}
        navigate={navigate}
        renderHeader={
          <Table.Header>
            <Table.Column isRowHeader>ID</Table.Column>
            <Table.Column isRowHeader>Total products</Table.Column>
            <Table.Column isRowHeader>Total</Table.Column>
            <Table.Column isRowHeader>Address</Table.Column>
            <Table.Column isRowHeader>Status</Table.Column>
          </Table.Header>
        }
        renderRow={(cart: Cart) => (
          <Table.Row
            key={cart.id}
            className="cursor-pointer hover:bg-gray-100"
            onClick={() => {
              setSelectedCart(cart)
              setIsModalOpen(true)
            }}
          >
            <Table.Cell className="w-10">{cart.id}</Table.Cell>
            <Table.Cell className="w-10">{cart.totalProducts}</Table.Cell>
            <Table.Cell className="w-fit">{cart.total} $</Table.Cell>
            <Table.Cell>Ljubljana 1</Table.Cell>
            <Table.Cell className="w-12">
              <Chip
                variant="primary"
                color={
                  cart.status === 'Pending'
                    ? 'default'
                    : cart.status === 'Shipped'
                      ? 'accent'
                      : 'success'
                }
              >
                {cart.status}
              </Chip>
            </Table.Cell>
          </Table.Row>
        )}
      />
      <Modal.Backdrop isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Heading slot="title" level={4}>
                Order status
              </Heading>
            </Modal.Header>
            <Modal.Body>
              {selectedCart ? (
                <>
                  <div className="mb-2">
                    {selectedCart.products.map((product) => (
                      <div
                        key={product.id}
                        className="border-b border-gray-200 py-2"
                      >
                        <p>
                          <span className="font-bold">{product.title}</span>{' '}
                          {product.quantity} x
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p>
                      Current status:{' '}
                      <span className="font-bold text-black">
                        {selectedCart.status}
                      </span>
                    </p>
                  </div>
                </>
              ) : null}
            </Modal.Body>
            <Modal.Footer>
              <Button
                slot="close"
                variant="danger-soft"
                onClick={() => handleShipment('Pending')}
              >
                Not shipped
              </Button>
              <Button slot="close" onClick={() => handleShipment('Shipped')}>
                Shipped
              </Button>
              <Button slot="close" onClick={() => handleShipment('Delivered')}>
                Delivered
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </div>
  )
}
