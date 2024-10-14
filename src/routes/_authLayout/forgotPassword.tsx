import Card, { CardHeader, CardBody, CardFooter } from '@/components/card';
import LoadingIndicator from '@/components/loadingIndicator';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { createFileRoute, Link } from '@tanstack/react-router'
import { CircleCheckBig } from 'lucide-react';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

export const Route = createFileRoute('/_authLayout/forgotPassword')({
    component: () => <ForgotPassword />
})

const PssswordRecoverSchema = z.object({
    email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
});

type Schema = z.infer<typeof PssswordRecoverSchema>

function ForgotPassword() {
    const { recoverPassword, isLoading } = useAuth();
    const { toast } = useToast()
    const [emailSent, setEmailSent] = useState(false);

    const form = useForm<Schema>({
        resolver: zodResolver(PssswordRecoverSchema),
        disabled: isLoading,
        defaultValues: {
            email: "",
        },
    })

    const onSubmit = async (fields: Schema) => {
        try {
            await recoverPassword(fields.email);
            setEmailSent(true);
        } catch (err) {
            if (err instanceof Error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: err.message,
                });
            } else {
                // Handle any other unknown errors that are not instances of Error
                toast({
                    variant: "destructive",
                    title: "Unknown error",
                    description: "An unexpected error occurred",
                });
            }
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full'>
                <Card className='border-none'>
                    <CardHeader>
                        <div className='flex flex-col justify-center'>
                            <h2 className="text-2xl md:text-3xl font-black text-secondary-background">
                                Recuperar contraseña
                            </h2>
                            <p className='text-muted text-sm md:text-base'>Ingresa tu mail y te enviaremos un link para poder rstablecer tu contraseña</p>
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
                                        Te enviamos un email con un link para recuperar tu contraseña!
                                    </p>
                                </div>
                                : (
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel id='email'>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="name@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                        }
                        <div className='flex justify-center'>
                            <Button disabled={isLoading || emailSent} className='min-w-[200px]' type="submit">
                                {isLoading ? <LoadingIndicator className="w-4 h-4 text-primary-foreground" /> : 'Enviar'}
                            </Button>
                        </div>
                    </CardBody>
                    <CardFooter className='bg-foreground'>
                        <div className='flex md:flex-row justify-center items-center'>
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