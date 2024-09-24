import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    console.debug('Checking authentication...', context.auth.isAuthenticated);
    // Handle a potential loading state for async auth check
    if (context.auth.isLoading) {
      console.debug('Authentication is loading...');
      return; // Allow loading to complete
    }

    if (!context.auth.isAuthenticated) {
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
