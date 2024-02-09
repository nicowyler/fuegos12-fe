import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiAuth } from "@/api";
import useAuth from "@/hooks/useAuth";
import { isApiResponse, isErrorMessage } from "@/api/guards";
import { Auth } from "@/types";
import CustomToaster from "@/components/CustomToaster";
import toast from "react-hot-toast";
import { ErrorMessage } from '@hookform/error-message';

const LoginSchema = z.object({
    email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
    password: z.string().min(3, { message: "Tiene que tener al menos 3 caracteres!" }),
});

type Schema = z.infer<typeof LoginSchema>

const Login = () => {
    const { logIn } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = async (fields: Schema) => {
        console.log(fields)
        const response = await ApiAuth.login(fields.email, fields.password);

        if (isErrorMessage(response)) {
            toast.error(response);
        } else if (isApiResponse<Auth>(response)) {
            const { data } = response.data;
            logIn(data);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            { ...register("email")} />
                            <ErrorMessage errors={errors} name="email"
                                render={({ message }) =>
                                    <p className="text-red-700 text-sm pt-1">{message}</p>
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register("password")} type="password" />
                            <ErrorMessage errors={errors} name="password"
                                render={({ message }) =>
                                    <p className="text-red-700 text-sm pt-1">{message}</p>
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    No tenes una cuenta?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Registrate
                    </a>
                </p>
                <CustomToaster/>
            </div>
        </div>
    )
}

export default Login;