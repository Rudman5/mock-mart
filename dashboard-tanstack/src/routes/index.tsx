import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/') {
      throw redirect({ to: '/products', search: { page: 1 } })
    }
  },
  component: App,
})

function App() {
  return <></>
}
