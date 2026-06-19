import { Outlet, useRouterState } from '@tanstack/react-router'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Skeleton from '@/components/Skeleton'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@heroui/react'
import { Person } from '@gravity-ui/icons'

export default function Layout() {
  const isLoading = useRouterState({ select: (s) => s.status === 'pending' })

  const { isAuthenticated, loginWithRedirect: auth0login } = useAuth0()
  const login = () =>
    auth0login({ authorizationParams: { screen_hint: 'login' } })

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      {isLoading && !isAuthenticated && (
        <div className="flex flex-1 items-center justify-center flex-col gap-4">
          It looks like you are not logged in. Please log in to access the
          dashboard.
          <Button onClick={login}>
            <span>Login</span>
            <Person></Person>
          </Button>
        </div>
      )}
      {isAuthenticated && (
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-4  text--overlay-foreground overflow-auto">
            {isLoading ? <Skeleton /> : <Outlet />}
          </main>
        </div>
      )}
    </div>
  )
}
