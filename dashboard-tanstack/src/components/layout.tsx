import { Outlet, useRouterState } from '@tanstack/react-router'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Skeleton from '@/components/Skeleton'

export default function Layout() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto bg-gray-50">
          {isLoading ? <Skeleton /> : <Outlet />}
        </main>
      </div>
    </div>
  )
}
