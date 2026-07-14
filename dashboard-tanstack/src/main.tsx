import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { router, queryClient } from './router'
import { Auth0Wrapper, useAuth0Context } from './auth/auth0'

const rootElement = document.getElementById('app')!
function InnerApp() {
  const auth = useAuth0Context()

  return <RouterProvider router={router} context={{ auth }} />
}
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Auth0Wrapper>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </Auth0Wrapper>
    </React.StrictMode>,
  )
}
