import { createFileRoute, Link } from '@tanstack/react-router';
import Card, { CardBody, CardFooter, CardHeader } from '@/components/card'
import { FormProvider, useForm } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterUserSchema, RegisterUserSchemaType } from '@/lib/auth/schema';
import PasswordInput from '@/components/passwordInput';
import LoadingIndicator from '@/components/loadingIndicator';
import { useAuth } from '@/hooks';
import { useState } from 'react';
import { Inbox } from 'lucide-react';

export const Route = createFileRoute('/_authLayout/registration')({
  component: () => <Registration />,
})

function Registration() {
  const { signUp } = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
    disabled: isLoading,
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (fields: RegisterUserSchemaType) => {
    setIsLoading(true);
    const response = await signUp(fields.email, fields.password);
    console.log("USER ID :::", response);
    if (response?.id) {
      setEmailSent(true);
    }
  }
  return (
    <div className='w-full h-full'>
      <Card className='justify-start border-none'>
        <CardHeader>
          <div className='h-10 flex flex-col justify-center'>
            <h2 className="text-2xl md:text-3xl font-black text-f12-black ml-4">
              Crear una Cuenta
            </h2>
          </div>
        </CardHeader>

        <CardBody className='w-full h-full flex flex-col justify-center px-10' >
          {
            emailSent ? <div>
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Inbox size={80} className='text-primary' />
                <h1 className="text-2xl md:text-3xl font-black text-f12-black text-pretty text-center">
                  Verifica tu correo electronico para validar tu cuenta!
                </h1>
              </div>
            </div>
              : (
                <FormProvider {...form}>
                  <form className='space-y-8'>
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
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel id='confirmPassword'>Confirmar Contraseña</FormLabel>
                          <FormControl>
                            <div className='relative'>
                              <PasswordInput fieldName={field.name} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className='w-full flex justify-center'>
                      <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading} className='min-w-[200px]' type="submit">
                        {isLoading ? <LoadingIndicator className="w-4 h-4 text-primary-foreground" /> : 'Registrarme'}
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              )
          }
        </CardBody >
        <CardFooter className='w-full bg-foreground'>
          <div className='flex flex-col-reverse md:flex-row justify-between items-center'>
            <p className='text-sm text-primary-foreground'>
              ¿ya tenes una cuenta?{' '}
              <Link to="/login">
                <Button className='-ml-3 text-primary' variant="link">
                  Login
                </Button>
              </Link>
            </p>
          </div>
        </CardFooter>

      </Card>
    </div>
  )
}