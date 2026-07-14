import { createFileRoute } from '@tanstack/react-router'
import { Table } from '@heroui/react'
import type { Cart } from '@/api/types'

import { ROWS_PER_PAGE } from '@/constants'
import { getCarts } from '@/api/cart/cartQueries'
import PaginatedTable from '@/components/PaginatedTable'

type CartSearch = {
  page: number
}

export const Route = createFileRoute('/carts')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getCarts()),
  component: CartsPage,
  validateSearch: (search: Record<string, number>): CartSearch => ({
    page: search.page || 1,
  }),
})

function CartsPage() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  // TODO implement sorting and filtering - FROM Backend

  return (
    <div className="gap-4 p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Carts</h2>
        {/* <Button
          type="button"
          onClick={() =>
            navigate({
              to: '/products/new',
            })
          }
        >
          Add Product
        </Button> */}
      </div>
      <div className="flex items-center justify-between mb-4"></div>
      <PaginatedTable
        items={data.carts}
        rowsPerPage={ROWS_PER_PAGE}
        ariaLabel="Carts"
        search={search}
        navigate={navigate}
        renderHeader={
          <Table.Header>
            <Table.Row>
              <Table.Column isRowHeader>ID</Table.Column>
              <Table.Column isRowHeader>Total products</Table.Column>
              <Table.Column isRowHeader>Total</Table.Column>
              <Table.Column isRowHeader>Status</Table.Column>
            </Table.Row>
          </Table.Header>
        }
        renderRow={(cart: Cart) => (
          <Table.Row key={cart.id} className="cursor-pointer hover:bg-gray-100">
            <Table.Cell>{cart.id}</Table.Cell>
            <Table.Cell>{cart.totalProducts}</Table.Cell>
            <Table.Cell>{cart.total} $</Table.Cell>
            {/* TODO ADD STATUS */}
            <Table.Cell>Shipped</Table.Cell>
          </Table.Row>
        )}
      />
    </div>
  )
}
