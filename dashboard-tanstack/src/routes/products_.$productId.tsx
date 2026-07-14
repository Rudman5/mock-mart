import {
  getCategories,
  getProductDetails,
  updateProductMutation,
} from '@/api/products/productQueries'

import { Button, Form } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import productSchema from '@/validation/productSchema'
import ProductForm from '@/components/ProductForm'

export const Route = createFileRoute('/products_/$productId')({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(
      getProductDetails(params.productId),
    )
    const categories =
      await context.queryClient.ensureQueryData(getCategories())
    return { product: data, categories }
  },
  component: ProductDetailPage,
})
function ProductDetailPage() {
  const { product: productData, categories } = Route.useLoaderData()
  const { queryClient } = Route.useRouteContext()

  const router = useRouter()

  const [disabledFields, setDisabledFields] = useState(true)

  const [product, setProduct] = useState(productData)
  const [originalProduct, setOriginalProduct] = useState(productData)

  const validation = productSchema.safeParse(product)

  const getError = (path: string) => {
    if (validation.success) return undefined

    return validation.error.issues.find((issue) => issue.path[0] === path)
      ?.message
  }

  const handleChange = (name: string, value: string | number) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const updateProduct = useMutation({
    ...updateProductMutation(product.id),

    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(
        getProductDetails(updatedProduct.id.toString()).queryKey,
        updatedProduct,
      )

      setProduct(updatedProduct)
      setOriginalProduct(updatedProduct)

      setDisabledFields(true)
    },
  })
  // TODO: Replace with SubmitEvent when heroUI updates submit type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validation.success) {
      console.error('Validation failed', z.treeifyError(validation.error))

      return
    }

    updateProduct.mutate(product)
  }

  const handleCancel = () => {
    setProduct(originalProduct)
    setDisabledFields(true)
  }

  return (
    <Form className="p-4" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <div>
          <span className="py-1 px-3 bg-gray-100 rounded text-sm font-mono">
            ID: {product.id} / SKU: {product.sku}
          </span>
        </div>
        <div className="flex gap-2">
          <Button type="button" onClick={() => router.history.back()}>
            Back
          </Button>
          {disabledFields ? (
            <Button type="button" onClick={() => setDisabledFields(false)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button type="button" onClick={handleCancel}>
                Cancel
              </Button>

              <Button type="submit" isDisabled={!validation.success}>
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      <ProductForm
        product={product}
        categories={categories}
        disabledFields={disabledFields}
        onChange={handleChange}
        getError={getError}
      />
    </Form>
  )
}
