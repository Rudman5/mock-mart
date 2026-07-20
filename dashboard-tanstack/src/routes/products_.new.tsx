import { createFileRoute } from '@tanstack/react-router'
import { Form, Button, Spinner } from '@heroui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
  createProductMutation,
  getCategories,
} from '@/api/products/productQueries'
import ProductForm from '@/components/ProductForm'
import productSchema from '@/validation/productSchema'
import type { Product } from '@/api/types'
import { filesToDataUrls } from '@/utils/fileHelpers'
import { router } from '@/router'

export const Route = createFileRoute('/products_/new')({
  loader: async ({ context }) => {
    const categories =
      await context.queryClient.ensureQueryData(getCategories())
    return { categories }
  },
  component: NewProductPage,
})

function NewProductPage() {
  const { categories } = Route.useLoaderData()
  const queryClient = useQueryClient()

  const [product, setProduct] = useState<Partial<Product>>({
    title: '',
    description: '',
    brand: '',
    category: '',
    price: 0,
    rating: 0,
    availabilityStatus: '',
    images: [],
  })

  const validation = productSchema.safeParse(product)

  const getError = (path: string) => {
    if (validation.success) return undefined

    return validation.error.issues.find((issue) => issue.path[0] === path)
      ?.message
  }

  const handleChange = (name: string, value: string | number | string[]) => {
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const handleFilesChange = async (files: File[]) => {
    const urls = await filesToDataUrls(files)
    handleChange('images', urls)
  }

  const createProduct = useMutation({
    ...createProductMutation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] })
      history.back()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validation.success) {
      console.error('Validation failed', validation.error)
      return
    }

    createProduct.mutate(product)
  }

  return (
    <Form className="p-4" onSubmit={handleSubmit}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create Product</h2>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="tertiary"
            onClick={() => router.history.back()}
          >
            Back
          </Button>
          <Button
            type="submit"
            isDisabled={!validation.success || createProduct.isPending}
          >
            {createProduct.isPending ? <Spinner size="sm" /> : 'Create'}
          </Button>
        </div>
      </div>

      <ProductForm
        product={product}
        categories={categories}
        disabledFields={false}
        onChange={handleChange}
        onFilesChange={handleFilesChange}
        getError={getError}
      />
    </Form>
  )
}
