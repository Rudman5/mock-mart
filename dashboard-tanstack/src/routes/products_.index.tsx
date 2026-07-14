import { createFileRoute } from '@tanstack/react-router'
import { Button, Table } from '@heroui/react'
import { getProducts } from '@/api/products/productQueries'
import type { Product } from '@/api/types'
import { ProductRow } from '@/components/ProductRow'
import { ROWS_PER_PAGE } from '@/constants'
import PaginatedTable from '@/components/PaginatedTable'

type ProductSearch = {
  page: number
}
export const Route = createFileRoute('/products_/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getProducts()),
  component: ProductsPage,
  validateSearch: (search: Record<string, number>): ProductSearch => ({
    page: search.page || 1,
  }),
})

function ProductsPage() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()

  // TODO implement sorting and filtering - FROM Backend

  return (
    <div className="gap-4 p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button
          type="button"
          onClick={() =>
            navigate({
              to: '/products/new',
            })
          }
        >
          Add Product
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4"></div>
      <PaginatedTable
        items={data.products}
        rowsPerPage={ROWS_PER_PAGE}
        ariaLabel="Products"
        search={search}
        navigate={navigate}
        onRowAction={(productKey) =>
          navigate({
            to: '/products/$productId',
            params: { productId: String(productKey) },
          })
        }
        renderHeader={
          <Table.Header>
            <Table.Row>
              <Table.Column isRowHeader>ID</Table.Column>
              <Table.Column isRowHeader>Title</Table.Column>
              <Table.Column isRowHeader>Price</Table.Column>
            </Table.Row>
          </Table.Header>
        }
        renderRow={(product: Product) => (
          <ProductRow key={product.id} product={product} />
        )}
      />
    </div>
  )
}
