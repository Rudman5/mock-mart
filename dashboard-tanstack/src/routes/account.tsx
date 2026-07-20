import { Card } from '@heroui/react'
import { createFileRoute } from '@tanstack/react-router'
import { useAuth0 } from '@auth0/auth0-react'

export const Route = createFileRoute('/account')({
  component: Account,
})

export default function Account() {
  const { user, isLoading } = useAuth0()

  if (isLoading) {
    return <p className="p-4">Loading account…</p>
  }

  return (
    <div className="p-4">
      <Card className="p-6">
        <div className="flex items-center gap-4">
          {user?.picture ? (
            <img
              src={user.picture}
              alt={user.name ?? 'User avatar'}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : null}{' '}
          <h1 className="text-2xl font-semibold">Account - {user?.sub}</h1>
        </div>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Name:</span> {user?.name ?? 'Unknown'}
          </p>
          <p>
            <span className="font-medium">Email:</span>{' '}
            {user?.email ?? 'No email provided'}
          </p>
          <p>
            <span className="font-medium">Phone Number:</span>{' '}
            {user?.phone_number ?? 'Unavailable'}
          </p>
        </div>
      </Card>
    </div>
  )
}
