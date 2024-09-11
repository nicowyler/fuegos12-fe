import { createFileRoute, Link, useRouter } from '@tanstack/react-router';
import { zodResolver, } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form"
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/auth';
import { useAuth } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import LoadingIndicator from '@/components/loadingIndicator';
import Card, { CardBody, CardFooter, CardHeader } from '@/components/card';
import PasswordInput from '@/components/passwordInput';
import { z } from 'zod';
import { useEffect } from 'react';

export const Route = createFileRoute('/_authLayout/login')({
  component: () => <Login />,
})

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
  password: z.string().min(3, { message: "Tiene que tener al menos 3 caracteres!" }),
});

type Schema = z.infer<typeof LoginSchema>

function Login() {
  const { logIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const { toast } = useToast()
  const mutation = useMutation({ mutationFn: login })

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    disabled: mutation.isPending,
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (fields: Schema) => {
    const response = await mutation.mutateAsync({ email: fields.email, password: fields.password });

    if (response.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: response.error,
      })
    } else if (response.data) {
      const { data } = response.data;
      logIn(data.user);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const redirectTo = "/";
      router.history.push(redirectTo, { replace: true });
    }
  }, [isAuthenticated, router.history]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full'>
        <Card className='border-none'>
          <CardHeader>
            <div className='flex flex-col justify-center'>
              <h2 className="text-2xl md:text-3xl font-black text-f12-black">
                Ingresa a tu cuenta
              </h2>
              <p className='text-muted text-sm md:text-base'>Ingresa tu email y contraseña para entrar a tu cuenta</p>
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
              <div className='flex justify-center flex-col items-center'>
                <Button disabled={mutation.isPending} className='min-w-[200px] mb-6' type="submit">
                  {mutation.isPending ? <LoadingIndicator className="w-4 h-4 text-primary-foreground" /> : 'Ingresar'}
                </Button>
                <p className='text-sm h-2'>
                  ¿Olvidaste tu contraseña?
                </p>
                <Link to="/forgotPassword">
                  <Button className='text-primary p-0 m-0' variant="link">
                    Recuperar Contraseña
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
          <CardFooter className='bg-foreground border-none'>
            <div className='flex flex-col md:flex-row justify-center items-center'>
              <p className='text-sm text-primary-foreground'>
                ¿No tenes una cuenta?{' '}
                <Link to="/registration">
                  <Button className='-ml-3 text-primary' variant="link">
                    Registrate
                  </Button>
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}


