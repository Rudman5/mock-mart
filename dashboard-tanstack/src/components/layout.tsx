import { Outlet, useRouterState } from '@tanstack/react-router'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Skeleton from '@/components/Skeleton'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@heroui/react'
import { Person } from '@gravity-ui/icons'

export default function Layout() {
  const {
    isAuthenticated,
    loginWithRedirect: auth0login,
    isLoading,
  } = useAuth0()

  const isRoutePending = useRouterState({
    select: (s) => s.status === 'pending',
  })

  const login = () =>
    auth0login({ authorizationParams: { screen_hint: 'login' } })

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {isLoading || isRoutePending ? (
          <main className="flex-1 p-4 text--overlay-foreground overflow-auto">
            <Skeleton />
          </main>
        ) : isAuthenticated ? (
          <main className="flex-1 p-4 text--overlay-foreground overflow-auto">
            <Outlet />
          </main>
        ) : (
          <div className="flex flex-1 items-center justify-center flex-col gap-4">
            It looks like you are not logged in. Please log in to access the dashboard.
            <Button onClick={login}>
              <span>Login</span>
              <Person />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
