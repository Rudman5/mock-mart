import { createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import type { QueryClient } from '@tanstack/react-query'
import '../styles.css'
import Layout from '../components/layout'
import type { Auth0ContextType } from '@/auth/auth0'

interface RouterContext {
  queryClient: QueryClient
  auth: Auth0ContextType
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      context.auth.login()
    }
  },
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      <Layout />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
