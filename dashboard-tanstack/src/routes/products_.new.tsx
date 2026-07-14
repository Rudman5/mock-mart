import { createFileRoute } from '@tanstack/react-router'
import { Form, Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import {
  createProductMutation,
  getCategories,
} from '@/api/products/productQueries'
import ProductForm from '@/components/ProductForm'
import productSchema from '@/validation/productSchema'

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

  const [product, setProduct] = useState<Partial<any>>({
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

  const handleChange = (name: string, value: string | number) => {
    setProduct((prev) => ({ ...prev, [name]: value }))
  }

  const createProduct = useMutation({
    ...createProductMutation(),
    onSuccess: () => {
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
        <Button type="submit" isDisabled={!validation.success}>
          Create
        </Button>
      </div>

      <ProductForm
        product={product}
        categories={categories}
        disabledFields={false}
        onChange={handleChange}
        getError={getError}
      />
    </Form>
  )
}
