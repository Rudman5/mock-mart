import { Card } from '@heroui/react'

export function NotFound() {
  return (
    <div className="h-full bg-slate-50 p-6">
      <Card className="w-full max-w-md p-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-default-500">
          404
        </p>

        <h1 className="text-2xl font-semibold">Page not found</h1>

        <p className="text-sm text-default-600">
          The page you are looking for does not exist or may have been moved.
        </p>
      </Card>
    </div>
  )
}
