import { getProductDetails, updateProductMutation } from '@/api/productQueries'
import BaseTextArea from '@/components/base/BaseTextArea'
import BaseTextField from '@/components/base/BaseTextField'
import { Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  brand: z.string().min(1, 'Brand is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().gt(0, 'Price must be greater than 0'),
  rating: z.coerce.number().min(0).max(5),
  availabilityStatus: z.string().min(1, 'Status is required'),
})

export const Route = createFileRoute('/products_/$productId')({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(
      getProductDetails(params.productId),
    )
    return { product: data }
  },
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { product: loaderData } = Route.useLoaderData()
  const { queryClient } = Route.useRouteContext()
  const [disabledFields, setDisabledFields] = useState(true)
  const [product, setProduct] = useState(loaderData)
  const router = useRouter()

  const handleChange = (name: string, value: string | number) => {
    validation
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validation = productSchema.safeParse(product)
  const getError = (path: string) => {
    if (validation.success) return undefined
    return validation.error.issues.find((issue) => issue.path[0] === path)
      ?.message
  }

  const updateProduct = useMutation({
    ...updateProductMutation(product.id),
    onSuccess: (updatedProduct) => {
      queryClient.setQueryData(
        getProductDetails(updatedProduct.id.toString()).queryKey,
        updatedProduct,
      )

      setDisabledFields(true)
    },
  })

  const sendUpdateProduct = () => {
    if (!validation.success) {
      console.error('Validation failed', z.treeifyError(validation.error))
      return
    }
    updateProduct.mutate(product)
    setDisabledFields(true)
  }

  return (
    <div key={product.id} className="p-6 space-y-4">
      <Button onClick={() => router.history.back()}>Back</Button>
      <div className="flex justify-between items-center">
        <div>
          <span className="py-1 px-3 bg-gray-100 rounded text-sm font-mono">
            ID: {product.id} / SKU: {product.sku}
          </span>
        </div>
        {disabledFields ? (
          <Button onClick={() => setDisabledFields(false)}>Edit</Button>
        ) : (
          <Button
            onClick={() => sendUpdateProduct()}
            isDisabled={!validation.success}
          >
            Save
          </Button>
        )}
      </div>

      <div className="flex gap-8">
        <div className="w-1/4 space-y-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full rounded-sm bg-white border-foreground border shadow-sm"
          />
          <div className="grid grid-cols-2 gap-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-full h-20 object-cover border rounded"
              />
            ))}
          </div>
        </div>

        <div className="grow gap-y-6 flex flex-col">
          <div className="grid grid-cols-1 gap-4">
            <BaseTextField
              label="Product Title"
              name="title"
              value={product.title}
              onChange={(val) => handleChange('title', val)}
              isDisabled={disabledFields}
              isInvalid={!!getError('title')}
              errorMessage={getError('title')}
            />
            <BaseTextArea
              label="Description"
              name="description"
              value={product.description}
              onChange={(val) => handleChange('description', val)}
              isDisabled={disabledFields}
              isInvalid={!!getError('description')}
              errorMessage={getError('description')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <BaseTextField
              label="Brand"
              name="brand"
              value={product.brand}
              onChange={(val) => handleChange('brand', val)}
              isDisabled={disabledFields}
              isInvalid={!!getError('brand')}
              errorMessage={getError('brand')}
            />
            <BaseTextField
              label="Category"
              name="category"
              value={product.category}
              onChange={(val) => handleChange('category', val)}
              isDisabled={disabledFields}
              isInvalid={!!getError('category')}
              errorMessage={getError('category')}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <BaseTextField
              label="Price ($)"
              name="price"
              type="number"
              value={product.price.toString()}
              onChange={(val) =>
                handleChange('price', parseFloat(val.toString()))
              }
              isDisabled={disabledFields}
              isInvalid={!!getError('price')}
              errorMessage={getError('price')}
            />
            <BaseTextField
              label="Rating"
              name="rating"
              type="number"
              value={product.rating.toString()}
              onChange={(val) =>
                handleChange('rating', parseFloat(val.toString()))
              }
              isDisabled={disabledFields}
              isInvalid={!!getError('rating')}
              errorMessage={getError('rating')}
            />
            <BaseTextField
              label="Status"
              name="availabilityStatus"
              value={product.availabilityStatus}
              onChange={(val) => handleChange('availabilityStatus', val)}
              isDisabled={disabledFields}
              isInvalid={!!getError('availabilityStatus')}
              errorMessage={getError('availabilityStatus')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
