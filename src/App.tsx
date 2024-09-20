import { AuthProvider } from "@/auth"
import { useAuth } from "@/hooks"
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query"
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'
import NotFound from '@/components/notFound'
import ErrorBoundary from "@/ErrorBoundary"

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  },
  defaultNotFoundComponent: () => {
    return <NotFound />
  }
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create a client
const queryClient = new QueryClient();

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          <AuthProvider>
            <InnerApp />
          </AuthProvider>
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}