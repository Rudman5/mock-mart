import type { Product } from '../api/types'
import { Table } from '@heroui/react'

export function ProductRow({ product }: { product: Product }) {
  return (
    <Table.Row id={product.id}>
      <Table.Cell>{product.id}</Table.Cell>
      <Table.Cell>{product.title}</Table.Cell>
      <Table.Cell>${product.price}</Table.Cell>
    </Table.Row>
  )
}
