import { createFileRoute } from '@tanstack/react-router'
import { productQueries } from '../api/productQueries'

export const Route = createFileRoute('/products_/$productId')({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(
      productQueries.getProductDetails(params.productId),
    )

    return { product: data }
  },
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { product } = Route.useLoaderData()

  return (
    <div key={product.id} className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full max-w-md rounded-lg my-4 shadow-lg"
      />
      <p className="text-gray-600 text-lg leading-relaxed">
        {product.description}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-2xl font-bold text-green-600">
          ${product.price}
        </span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
          ID: {product.id}
        </span>
      </div>
    </div>
  )
}
