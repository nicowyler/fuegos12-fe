import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import CustomToaster from "@/components/CustomToaster";
import { ErrorMessage } from '@hookform/error-message';
import UseUserStore from "@/store/user.store";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ApiAuth } from "@/api/Auth";
import { isApiResponse, isErrorMessage } from "@/api/guards";
import { AuthType } from "@/types";
import Logo from "@/components/Logo";
import { useState } from "react";
import PasswordVisible from "@/components/PasswordVisible";
import SubmitButton from "@/components/SubmitButton";
import { useApiMiddleware } from "@/hooks/useApiMiddleware";

const phoneRegex = new RegExp('^(?=.{10}$)');

const RegisterSchema = z.object({
    email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
    password: z.string().min(6, { message: "Tiene que tener al menos 6 caracteres!" }),
    phoneNumber: z.string().regex(phoneRegex, 'Numbero Invalido!'),
    firstName: z.string().min(3, { message: "El nombre no es valido!" }),
    lastName: z.string().min(1, { message: "Ingresa tu apellido" }),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

const Login = () => {
    const { isLoading, apiCall } = useApiMiddleware();
    const userState = UseUserStore();
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({
        resolver: zodResolver(RegisterSchema),
    })


    const togglePasswordVisibility = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }
    const onSubmit = async (fields: RegisterSchemaType) => {
        fields.phoneNumber = `+549${fields.phoneNumber}`;

        const response = await apiCall<AuthType>(() => ApiAuth.register(fields))

        userState.saveUser({
            email: fields.email,
            password: fields.password,
            fullName: {
                firstName: fields.firstName,
                lastName: fields.lastName
            },
            phone: fields.phoneNumber,
            roles: ['USER']
        })

        if (isErrorMessage(response)) {
            toast.error(response);
        } else if (isApiResponse<AuthType>(response)) {
            navigate('/otp');
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-start pt-[5 %] lg:pt-0 lg:justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo />
                <h2 className="text-center text-3xl font-title font-bold tracking-widest uppercase text-f12-creame">
                    Ingresa a tu cuenta
                </h2>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-row gap-4 h-[60px]">
                        {/* Nombre */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-f12-creame">
                                Nombre
                            </label>
                            <div>
                                <input
                                    disabled={isLoading}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
                                    {...register("firstName")} placeholder="Juan Carlos" />
                                <ErrorMessage errors={errors} name="firstName"
                                    render={({ message }) =>
                                        <p className="text-red-400 text-sm pt-1">{message}</p>
                                    }
                                />
                            </div>
                        </div>
                        {/* Apellido */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-f12-creame">
                                Apellido
                            </label>
                            <div>
                                <input
                                    disabled={isLoading}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
                                    {...register("lastName")} placeholder="Madero" />
                                <ErrorMessage errors={errors} name="lastName"
                                    render={({ message }) =>
                                        <p className="text-red-400 text-sm pt-1">{message}</p>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {/* EMAIL */}
                    <div className="h-[70px]">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-f12-creame">
                            Email
                        </label>
                        <div>
                            <input
                                disabled={isLoading}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
                                {...register("email")} placeholder="fuegos12dejulio@gmail.com" />
                            <ErrorMessage errors={errors} name="email"
                                render={({ message }) =>
                                    <p className="text-red-400 text-sm pt-1">{message}</p>
                                }
                            />
                        </div>
                    </div>
                    {/* CONTRASENÑA */}
                    <div className="h-[70px]">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-f12-creame">
                                Contraseña
                            </label>
                        </div>
                        <div className="relative">
                            <input
                                disabled={isLoading}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
                                {...register("password")}
                                type={isPasswordVisible ? "text" : "password"}
                            />
                            <PasswordVisible isPasswordVisible={isPasswordVisible} togglePasswordVisibility={togglePasswordVisibility} />
                            <ErrorMessage errors={errors} name="password"
                                render={({ message }) =>
                                    <p className="text-red-400 text-sm pt-1">{message}</p>
                                }
                            />
                        </div>
                    </div>
                    {/* TELEFONO */}
                    <div className="h-[70px]">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-f12-creame">
                                Celular (sin espacios)
                            </label>
                        </div>
                        <div>

                            <div className="relative w-full">
                                <div className="w-20 absolute top-[6px] left-4 text-gray-500 sm:text-sm sm:leading-6 border-0">+54 9</div>
                                <input
                                    disabled={isLoading}
                                    className="rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 w-full py-1.5 pl-16 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
                                    placeholder="1156694242"
                                    {...register("phoneNumber")} type="number" />
                            </div>

                            <ErrorMessage errors={errors} name="phoneNumber"
                                render={({ message }) =>
                                    <p className="text-red-400 text-sm pt-1">{message}</p>
                                }
                            />
                        </div>
                    </div>


                    <SubmitButton label="Registrarme" isLoading={isLoading} />

                </form>
                <p className="my-5 text-center text-sm text-f12-creame">
                    Ya tenes una cuenta?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-f12-blue hover:text-f12-blue-light">
                        Ir al Login
                    </Link>
                </p>
                <CustomToaster />
            </div>
        </div>
    )
}

export default Login;