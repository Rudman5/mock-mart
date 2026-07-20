import {
  getCategories,
  getProductDetails,
  updateProductMutation,
} from '@/api/products/productQueries'
import { Button, Form } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import productSchema from '@/validation/productSchema'
import ProductForm from '@/components/ProductForm'
import { filesToDataUrls } from '@/utils/fileHelpers'
import type { Product } from '@/api/types'

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
  const reactQueryClient = useQueryClient()

  const router = useRouter()

  const [disabledFields, setDisabledFields] = useState(true)

  const [product, setProduct] = useState<Partial<Product>>(productData)
  const [originalProduct, setOriginalProduct] = useState<Partial<Product>>(productData)
  const [attachmentResetSignal, setAttachmentResetSignal] = useState(0)

  const productId = product.id ?? productData.id

  const validation = productSchema.safeParse(product)

  const getError = (path: string) => {
    if (validation.success) return undefined

    return validation.error.issues.find((issue) => issue.path[0] === path)
      ?.message
  }

  const handleChange = (name: string, value: string | number | string[]) => {
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFilesChange = async (files: File[]) => {
    const urls = await filesToDataUrls(files)

    setProduct((prev) => {
      const currentImages = Array.isArray(prev.images) ? prev.images : []
      const mergedImages = [...currentImages, ...urls]

      return {
        ...prev,
        images: mergedImages,
      }
    })
  }

  const handleRemoveImage = (index: number) => {
    setProduct((prev) => {
      const currentImages = Array.isArray(prev.images) ? prev.images : []
      const updatedImages = currentImages.filter((_, i) => i !== index)

      if (updatedImages.length === 0) {
        setAttachmentResetSignal((signal) => signal + 1)
      }

      return {
        ...prev,
        images: updatedImages,
      }
    })
  }

  const updateProduct = useMutation({
    ...updateProductMutation(productId),

    onSuccess: async (updatedProduct) => {
      await reactQueryClient.invalidateQueries({ queryKey: ['products'] })
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
          <Button
            type="button"
            variant="tertiary"
            onClick={() => router.history.back()}
          >
            Back
          </Button>
          {disabledFields ? (
            <Button type="button" onClick={() => setDisabledFields(false)}>
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                type="button"
                onClick={handleCancel}
                variant="danger-soft"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                isDisabled={!validation.success || updateProduct.isPending}
              >
                {updateProduct.isPending ? 'Saving…' : 'Save'}
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
        onFilesChange={handleFilesChange}
        onRemoveImage={handleRemoveImage}
        resetAttachmentSignal={attachmentResetSignal}
        getError={getError}
      />
    </Form>
  )
}
