import { createFileRoute, Outlet, Link, useRouter } from '@tanstack/react-router';
import MercadoPagoProvider from '@/hooks/MercadoPagoProvider';
import { CircleUser, Menu, Package2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast';
import { logout } from '@/lib/auth';
import { useAuth } from '@/hooks';
import { useEffect } from 'react';

export const Route = createFileRoute('/_authenticated/_dashboardLayout')({
    component: () => <DashboardLayout />
})

export default function DashboardLayout() {
    const mutation = useMutation({ mutationFn: logout })
    const { logOut, isAuthenticated } = useAuth();
    const router = useRouter();

    const closeSession = async () => {
        const response = await mutation.mutateAsync();

        if (response.error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: response.error,
            })
        } else if (response.data) {
            logOut();
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            const redirectTo = "/login";
            router.history.push(redirectTo, { replace: true });
        }
    }, [isAuthenticated, router.history]);

    return (
        <div className="flex min-h-screen w-full flex-col overflow-hidden animate-fade-in animate-duration-1000">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 bg-foreground border-none">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Orders
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Products
                    </Link>
                    <Link
                        href="#"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Customers
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Settings
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="shrink-0 md:hidden text-primary-foreground"
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6" />
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Orders
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Products
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Customers
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full text-primary-foreground">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <Link to='/contacto'>
                                <DropdownMenuItem>
                                    Contacto
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={closeSession}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <MercadoPagoProvider>
                <Outlet />
            </MercadoPagoProvider>
        </div >
    )
}
