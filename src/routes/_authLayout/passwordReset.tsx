import Card, { CardHeader, CardBody, CardFooter } from '@/components/card';
import CountDownIndicator from '@/components/countdown';
import LoadingIndicator from '@/components/loadingIndicator';
import PasswordInput from '@/components/passwordInput';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { confirmPasswordReset } from 'firebase/auth';
import { CircleCheckBig } from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { auth } from '../../lib/firebase';
import { useAuth } from '@/hooks';

type TokenSearch = { oobCode: string };

export const Route = createFileRoute('/_authLayout/passwordReset')({
    validateSearch: (search: Record<string, unknown>): TokenSearch => {
        return {
            oobCode: (search?.token) as string || '',
        };
    },
    component: () => <PasswordRecover />
})

const PssswordRecoverSchema = z.object({
    password: z.string().min(3, { message: "Tiene que tener al menos 3 caracteres!" }),
});

type Schema = z.infer<typeof PssswordRecoverSchema>

function PasswordRecover() {
    const { isLoading } = useAuth();
    const { oobCode } = Route.useSearch();
    const router = useRouter();
    const { toast } = useToast()
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<Schema>({
        resolver: zodResolver(PssswordRecoverSchema),
        disabled: isLoading,
        defaultValues: {
            password: "",
        },
    })

    const onSubmit = async (fields: Schema) => {
        if (!oobCode) {
            toast({
                variant: "destructive",
                title: "Error",
                description: 'No se encontro el token de recuperación',
            })
            return;
        }

        try {
            // Send the oobCode and new password to Firebase
            await confirmPasswordReset(auth, oobCode, fields.password);
            setEmailSent(true);
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Error",
                description: 'Algo salio mal al enviar la nueva contraseña',
            })
        }
    }

    const redirectToLogin = () => {
        const redirectTo = '/login';
        router.history.push(redirectTo, { replace: true });
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full'>
                <Card className='border-none'>
                    <CardHeader>
                        <div className='flex flex-col justify-center'>
                            <h2 className="text-2xl md:text-3xl font-black text-secondary-background pb-2">
                                Nueva Contraseña
                            </h2>
                            <p className='text-muted text-sm md:text-base'>Ingresa una nueva contraseña para restaurar tu accesso</p>
                        </div>
                    </CardHeader>
                    <CardBody className={cn('space-y-8 m-auto h-auto px-10', {
                        'w-full': !emailSent
                    })}>
                        {
                            emailSent
                                ? <div className='text-center space-y-4 flex flex-col items-center'>
                                    <CircleCheckBig size={100} className="text-primary" />
                                    <h2 className='font-medium text-2xl text-center'>
                                        Gracias!
                                    </h2>
                                    <p>
                                        Tu contraseña ha sido cambiada con exito!
                                    </p>
                                    <CountDownIndicator
                                        showTimer
                                        label='Redirigiendo al Login en'
                                        time={20}
                                        callback={redirectToLogin}
                                    />
                                </div>
                                : (
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel id='password'>Contraseña</FormLabel>
                                                <FormControl>
                                                    <div className='relative'>
                                                        <PasswordInput fieldName={field.name} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                        }
                        <div className='w-full flex justify-center'>
                            <Button disabled={isLoading || emailSent} className='min-w-[200px]' type="submit">
                                {isLoading ? <LoadingIndicator className="w-4 h-4" /> : 'Enviar'}
                            </Button>
                        </div>
                    </CardBody>
                    <CardFooter className='bg-foreground'>
                        <div className='flex w-full justify-center'>
                            <p className='text-sm text-primary-foreground text-center'>
                                Me confundi, no quiero estar aqui!
                                <Link to="/login">
                                    <Button className='-ml-3 text-primary' variant="link">
                                        Volver al login
                                    </Button>
                                </Link>
                            </p>

                        </div>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}