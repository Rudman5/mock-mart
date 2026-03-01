import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/orders')({
  component: Orders,
})

export default function Orders() {
  return (
    <div>
      <h1>Orders</h1>
    </div>
  )
}
