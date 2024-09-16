import Card, { CardHeader, CardBody, CardFooter } from '@/components/card'
import LoadingIndicator from '@/components/loadingIndicator'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { sendContactMessage } from '@/lib/api/contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/_authenticated/_dashboardLayout/contacto')({
    component: () => <Contacto />
})
const ContactSchema = z.object({
    email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
    message: z.string().min(1, { message: "Tienes que completar este campo!" }),
});
type Schema = z.infer<typeof ContactSchema>

export default function Contacto() {
    const mutation = useMutation({ mutationFn: sendContactMessage })

    const form = useForm<Schema>({
        resolver: zodResolver(ContactSchema),
        disabled: mutation.isPending,
        defaultValues: {
            email: "",
            message: "",
        },
    })

    const onSubmit = async (fields: Schema) => {
        await mutation.mutateAsync({ email: fields.email, message: fields.message });

        if (mutation.isError) {
            toast({
                variant: "destructive",
                title: "Error",
                description: mutation.error.message,
            })
        } else {
            toast({
                title: "Su mensaje ha sido enviado",
                description: "Gracias por contactarnos!",
            })
        }
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full'>
                <Card className='border-none shadow-none'>
                    <CardHeader>
                        <div className='flex flex-col justify-center'>
                            <h2 className="text-2xl md:text-3xl font-black text-f12-black">
                                Contacto
                            </h2>
                            <p className='text-muted text-sm md:text-base'>Envianos un mensaje por cualquier consulta y le responderemos a la brevedad</p>
                        </div>
                    </CardHeader>
                    <CardBody className='w-full flex justify-center px-10 h-auto' >
                        <div className='w-full space-y-6'>
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
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel id='message'>Que nos quieres contar?</FormLabel>
                                        <FormControl>
                                            <div className='relative'>
                                                <Textarea placeholder="Tu mensaje" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex justify-center flex-col items-center'>
                                <Button disabled={mutation.isPending} className='min-w-[200px] mb-6' type="submit">
                                    {mutation.isPending ? <LoadingIndicator className="w-4 h-4 text-primary-foreground" /> : 'Enviar'}
                                </Button>
                            </div>
                        </div>
                    </CardBody>
                    <CardFooter className='bg-foreground border-none absolute bottom-0 w-full'>
                        <div className='flex flex-col md:flex-row justify-center items-center'>
                            <p className='text-sm text-primary-foreground'>
                                Fuegos 12 de Julio © {new Date().getFullYear()}
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </FormProvider>
    )
}
