import { Toaster } from '@/components/ui/toaster'
import { AuthContextType } from '@/types'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

interface MyRouterContext {
    auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => (
        <>
            <Outlet />
            <Toaster />
        </>
    ),
})
