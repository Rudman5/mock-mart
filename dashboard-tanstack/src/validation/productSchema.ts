import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  brand: z.string('Brand is required').min(1, 'Brand is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce
    .number('Price must be greater than 0')
    .gt(0, 'Price must be greater than 0'),
  rating: z.coerce
    .number('Rating must be a number')
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5'),
  availabilityStatus: z.string().optional(),
})

export default productSchema
