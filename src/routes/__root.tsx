import { AuthContextType } from '@/auth'
import { Toaster } from '@/components/ui/toaster'
import { useStoreIdInitializer } from '@/hooks/storeInitializer'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

interface MyRouterContext {
    auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: () => {
        useStoreIdInitializer();
        return (
            <>
                <Outlet />
                <Toaster />
            </>
        )
    }
})