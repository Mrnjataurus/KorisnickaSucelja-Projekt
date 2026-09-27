export interface ProductReview {
  rating: number
  comment: string
  reviewerName: string
}

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand?: string
  thumbnail: string
  images: string[]
  availabilityStatus?: string
  warrantyInformation?: string
  shippingInformation?: string
  returnPolicy?: string
  reviews?: ProductReview[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}
