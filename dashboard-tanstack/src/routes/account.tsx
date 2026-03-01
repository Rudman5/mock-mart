import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account')({
  component: Account,
})

export default function Account() {
  return (
    <div>
      <h1>Account</h1>
    </div>
  )
}
