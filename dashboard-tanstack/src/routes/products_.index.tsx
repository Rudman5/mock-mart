import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Pagination, Table } from '@heroui/react'
import { getProducts } from '@/api/productQueries'
import type { Product } from '@/api/types'
import { ProductRow } from '@/components/ProductRow'
import { useMemo, useState } from 'react'
import { ROWS_PER_PAGE } from '@/constants'

export const Route = createFileRoute('/products_/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getProducts()),
  component: ProductsPage,
})

function ProductsPage() {
  const data = Route.useLoaderData()
  const navigate = useNavigate()

  // PAGINATION from heroui
  const [page, setPage] = useState(1)
  const totalPages = Math.ceil(data.products.length / ROWS_PER_PAGE)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE
    return data.products.slice(start, start + ROWS_PER_PAGE)
  }, [page])
  const start = (page - 1) * ROWS_PER_PAGE + 1
  const end = Math.min(page * ROWS_PER_PAGE, data.products.length)

  // TODO implement sorting and filtering - FROM Backend
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Table>
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
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                  Prev
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Pagination.Item key={p}>
                  <Pagination.Link
                    isActive={p === page}
                    onPress={() => setPage(p)}
                  >
                    {p}
                  </Pagination.Link>
                </Pagination.Item>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
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
