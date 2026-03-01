import { createFileRoute } from '@tanstack/react-router'
import { productQueries } from '../api/productQueries'
import { ProductCard } from '@/components/ProductCard'

export const Route = createFileRoute('/products_/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(productQueries.getProducts()),
  component: ProductsPage,
})

function ProductsPage() {
  const data = Route.useLoaderData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
