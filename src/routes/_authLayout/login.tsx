import { createFileRoute, Link, useSearch, useRouter } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
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
});

const LoginSchema = z.object({
  email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
  password: z.string().min(3, { message: "Tiene que tener al menos 3 caracteres!" }),
});

type Schema = z.infer<typeof LoginSchema>;

function Login() {
  const { logIn, isAuthenticated, signInWithGoogle, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Use `useSearch` to get the redirect URL, if available
  const search = useSearch({ strict: false }) as { redirect?: string };
  const redirectTo = search.redirect ?? "/dashboard";

  const form = useForm<Schema>({
    resolver: zodResolver(LoginSchema),
    disabled: isLoading,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (fields: Schema) => {
    try {
      await logIn(fields.email, fields.password);
    } catch (error: any) {
      if (error.code) {
        switch (error.code) {
          case "auth/wrong-password":
            toast({
              variant: "destructive",
              title: "Error",
              description: "Incorrect password, please try again.",
            });
            break;
          case "auth/user-not-found":
            toast({
              variant: "destructive",
              title: "Error",
              description: "User not found, please check your email.",
            });
            break;
          case "auth/invalid-credential":
            toast({
              variant: "destructive",
              title: "Error",
              description: "El email o la contraseña son incorrectos.",
            });
            break;
          default:
            toast({
              variant: "destructive",
              title: "Error",
              description: "Algo salio mal! intentelo otra vez.",
            });
            break;
        }
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred. Please try again.",
        });
      }
    }
  };

  function handleSignInWithGoogle() {
    signInWithGoogle();
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.history.push(redirectTo, { replace: true });
    }
  }, [isAuthenticated, redirectTo, router.history]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full h-full'>
        <Card className='border-none'>
          <CardHeader>
            <h2 className="text-2xl md:text-3xl font-black text-f12-black ml-4">
              Ingresa a tu cuenta
            </h2>
          </CardHeader>
          <CardBody className='w-full flex px-10 h-full py-3'>
            <div className='w-full space-y-4'>
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
                    <FormLabel id='password' className='flex justify-between items-end mt-5'>
                      <span>Contraseña</span>
                      <Link to="/forgotPassword">
                        <Button className='text-primary p-0 m-0 h-0' variant="link">
                          Olvidaste tu contraseña?
                        </Button>
                      </Link>
                    </FormLabel>
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
                <Button disabled={isLoading} className='w-full mb-2' type="submit">
                  {isLoading ? <LoadingIndicator className="w-4 h-4 text-primary-foreground" /> : 'Ingresar'}
                </Button>
              </div>
              <div className='flex justify-center flex-col items-center'>
                <div className='w-full flex justify-center items-center gap-3 mb-4'>
                  <div className='border-t border-muted/50 w-1/3'></div>
                  <div className='text-muted/50'>o</div>
                  <div className='border-t border-muted/50 w-1/3'></div>
                </div>
                <Button className='w-full' variant="secondary" type="button" onClick={() => handleSignInWithGoogle()}>
                  {isLoading ?
                    <LoadingIndicator className="w-4 h-4 text-primary-foreground" />
                    : (
                      <>
                        <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        <span>Iniciar con google</span>
                      </>
                    )
                  }
                </Button>
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
  );
}
