// src/routes/authenticatedRoute.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const authContext = context.auth;
    console.debug('Checking authentication...', authContext.isAuthenticated);

    // Handle a potential loading state for async auth check
    if (authContext.isLoading) {
      console.debug('Authentication is loading...');
      return; // Allow loading to complete
    }

    if (!authContext.isAuthenticated) {
      console.debug('Not authenticated, redirecting to login...');
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          redirect: location.href,
        },
      });
    }

    console.debug('Authenticated!');
    return context;
  },
  component: AuthenticatedRoute,
});

export function AuthenticatedRoute() {
  return <Outlet />;
}
