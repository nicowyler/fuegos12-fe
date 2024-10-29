// src/routes/authenticatedRoute.tsx
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    const authContext = context.auth;

    // Allow unauthenticated access to the Mercado Pago success route
    if (location.pathname === '/mercado-pago/success') {
      console.debug('Allowing access to Mercado Pago success route');
      return context;
    }

    if (authContext.isLoading) {
      console.debug('Authentication is loading...');
      return; // Allow loading to complete
    }

    if (!authContext.isAuthenticated) {
      console.debug('Not authenticated, redirecting to login...');
      throw redirect({
        to: '/login',
        search: {
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
