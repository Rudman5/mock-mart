import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient } from '@tanstack/react-query'
import { NotFound } from './components/NotFound'

export const queryClient = new QueryClient()

export const router = createRouter({
  defaultNotFoundComponent: () => {
    return <NotFound />
  },
  routeTree,
  context: {
    queryClient,
    auth: undefined!,
  },
  defaultPreload: false,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
