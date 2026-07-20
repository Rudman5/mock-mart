import { createFileRoute } from '@tanstack/react-router'
import { Button, Table } from '@heroui/react'
import { getProducts } from '@/api/products/productQueries'
import type { Product } from '@/api/types'
import { ProductRow } from '@/components/ProductRow'
import { ROWS_PER_PAGE } from '@/constants'
import PaginatedTable from '@/components/PaginatedTable'
import { useMemo } from 'react'
import BaseSearchField from '@/components/base/BaseSearchField'

type ProductSearch = {
  page: number
  query?: string
}
export const Route = createFileRoute('/products_/')({
  loader: ({ context }) => context.queryClient.ensureQueryData(getProducts()),
  component: ProductsPage,
  validateSearch: (search: Record<string, string | number>): ProductSearch => ({
    page: Number(search.page) || 1,
    query: search.query ? String(search.query) : undefined,
  }),
})

function ProductsPage() {
  const data = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const search = Route.useSearch()
  const query = search.query ?? ''

  const handleQueryChange = (value: string) => {
    navigate({ search: { ...search, query: value, page: 1 } })
  }

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return data.products
    }

    return data.products.filter((product) => {
      const haystack =
        `${product.title} ${product.description} ${product.brand ?? ''} ${product.category}`.toLowerCase()
      return haystack.includes(normalizedQuery)
    })
  }, [data.products, query])

  return (
    <div className="gap-4 p-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <BaseSearchField
          value={query}
          onChange={handleQueryChange}
          placeholder="Search products"
        />
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
        items={filteredProducts}
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
            <Table.Column isRowHeader>ID</Table.Column>
            <Table.Column isRowHeader>Title</Table.Column>
            <Table.Column isRowHeader>Price</Table.Column>
          </Table.Header>
        }
        renderRow={(product: Product) => (
          <ProductRow key={product.id} product={product} />
        )}
      />
    </div>
  )
}
