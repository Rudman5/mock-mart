export type Dimensions = {
  width: number
  height: number
  depth: number
}

export type Review = {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export type MetaData = {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export type Product = {
  id: string
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand?: string
  sku: string
  weight: number
  dimensions: Dimensions
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus?: string
  reviews: Review[]
  returnPolicy: string
  minimumOrderQuantity: number
  meta: MetaData
  thumbnail: string
  images: string[]
}

export type ProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}
export type ProductId = Product['id']

export type Cart = {
  id: number
  products: Product[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export type CartsResponse = {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}
