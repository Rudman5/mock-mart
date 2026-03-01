import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/customers')({
  component: Customers,
})

export default function Customers() {
  return (
    <div>
      <h1>Customers</h1>
    </div>
  )
}
