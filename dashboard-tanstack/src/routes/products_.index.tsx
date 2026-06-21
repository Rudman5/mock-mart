import { createFileRoute } from '@tanstack/react-router'
import { Button, Pagination, Table } from '@heroui/react'
import { getProducts } from '@/api/productQueries'
import type { Product } from '@/api/types'
import { ProductRow } from '@/components/ProductRow'
import { useMemo } from 'react'
import { ROWS_PER_PAGE } from '@/constants'

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

  // PAGINATION from heroui
  const totalPages = Math.ceil(data.products.length / ROWS_PER_PAGE)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const paginatedItems = useMemo(() => {
    const start = (search.page - 1) * ROWS_PER_PAGE
    return data.products.slice(start, start + ROWS_PER_PAGE)
  }, [search.page])
  const start = (search.page - 1) * ROWS_PER_PAGE + 1
  const end = Math.min(search.page * ROWS_PER_PAGE, data.products.length)
  // TODO implement sorting and filtering - FROM Backend

  return (
    <div className="gap-4 p-1 w-full">
      <div className="flex items-center justify-between mb-4">
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
      <Table className="w-full">
        <Table.ScrollContainer>
          <Table.Content
            aria-label="Products"
            selectionMode="single"
            onRowAction={(productKey) => {
              navigate({
                to: '/products/$productId',
                params: { productId: String(productKey) },
              })
            }}
          >
            <Table.Header>
              <Table.Row>
                <Table.Column isRowHeader>ID</Table.Column>
                <Table.Column isRowHeader>Title</Table.Column>
                <Table.Column isRowHeader>Price</Table.Column>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {paginatedItems.map((product: Product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>
          <Pagination size="sm">
            <Pagination.Summary>
              {start} to {end} of {data.products.length} results
            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={search.page === 1}
                  onPress={() =>
                    navigate({ search: { ...search, page: search.page - 1 } })
                  }
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === search.page}
                    onPress={() => navigate({ search: { ...search, page: p } })}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={search.page === totalPages}
                  onPress={() =>
                    navigate({ search: { ...search, page: search.page + 1 } })
                  }
                >
                  Next
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </Table.Footer>
      </Table>
    </div>
  )
}
