import { createFileRoute, Outlet, Link, useRouter } from '@tanstack/react-router';
import MercadoPagoProvider from '@/hooks/MercadoPagoProvider';
import { CircleUser, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from '@/hooks';
import { useEffect, useState } from 'react';
import PwaInstallButton from '@/components/PwaInstallButton';

export const Route = createFileRoute('/_authenticated/_dashboardLayout')({
    component: () => <DashboardLayout />
})

export default function DashboardLayout() {
    const [open, setOpen] = useState(false);
    const { logOut, isAuthenticated, user } = useAuth();
    const router = useRouter();

    const closeSession = async () => {
        logOut();
    }

    function linkClick() {
        setOpen(false);
    }

    useEffect(() => {
        if (!isAuthenticated) {
            const redirectTo = "/login";
            router.history.push(redirectTo, { replace: true });
        }
    }, [isAuthenticated, router.history]);

    return (
        <div className="flex h-full w-full flex-col overflow-hidden animate-fade-in animate-duration-800">
            <header className="sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 bg-foreground border-none">
                <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link onClick={linkClick} to="/dashboard" search={{ tab: "carbon" }} className="text-muted-foreground">
                        Productos
                    </Link>
                    <Link
                        onClick={linkClick}
                        to="/mis-compras"
                        className="text-muted-foreground"
                    >
                        Mis Compras
                    </Link>
                    <Link onClick={closeSession}
                        to=""
                        className="text-muted-foreground"
                    >
                        Logout
                    </Link>
                </nav>
                <Sheet open={open} onOpenChange={(isOpen) => {
                    if (!isOpen) {
                        setOpen(false);
                    } else {
                        setOpen(isOpen);
                    }
                }}>
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
                    <SheetContent side="left" className='bg-foreground border-none text-primary-foreground'>
                        <div className='p-5 bg-foreground rounded-md mt-4'>
                            <img src="/logo-fuegos12.svg" alt='logo' />
                        </div>
                        <div className='relative h-[calc(100vh-20rem)]'>
                            <nav className="grid gap-4 text-lg font-medium text-center justify-center">
                                <Link
                                    activeProps={{ className: 'text-primary-foreground' }}
                                    onClick={linkClick}
                                    to="/dashboard"
                                    search={{ tab: "carbon" }}
                                    className="w-full text-muted-foreground">
                                    <Button variant="ghost" className='text-base'>
                                        Productos
                                    </Button>
                                </Link>
                                <Link
                                    activeProps={{ className: 'text-primary-foreground' }}
                                    onClick={linkClick}
                                    to="/mis-compras"
                                    className="w-full text-muted-foreground"
                                >
                                    <Button variant="ghost" className='text-base'>
                                        Mis Compras
                                    </Button>
                                </Link>
                                <Link
                                    activeProps={{ className: 'text-primary-foreground' }}
                                    onClick={linkClick}
                                    to="/contacto"
                                    className="w-full text-muted-foreground "
                                >
                                    <Button variant="ghost" className='text-base'>
                                        Contacto
                                    </Button>
                                </Link>
                                <Link onClick={closeSession}
                                    to=""
                                    className="w-full text-muted-foreground"
                                >
                                    <Button variant="ghost" className='text-base'>
                                        Logout
                                    </Button>
                                </Link>

                            </nav>
                            <div className='absolute bottom-5 w-full'>
                                <PwaInstallButton />
                                <p className='text-sm text-primary-foreground text-center mt-5'>
                                    Fuegos 12 de Julio © {new Date().getFullYear()}
                                </p>
                                <Link onClick={linkClick}
                                    to='/terms'
                                    className="text-muted-foreground text-sm text-center w-full block mt-1 underline"
                                >
                                    Terminos y Condiciones
                                </Link>
                            </div>
                        </div>

                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center justify-end md:ml-auto">
                    <span className='text-primary-foreground text-sm'>
                        {user?.email}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full text-primary-foreground">
                                {user?.photoURL ? <img src={user?.photoURL} className="h-7 w-7 rounded-full" /> : <CircleUser className="h-5 w-5" />}
                                <span className="sr-only">Menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
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
