import { ApiAuth } from '@/api';
import { isApiResponse, isErrorMessage } from '@/api/guards';
import CustomToaster from '@/components/CustomToaster';
import Logo from '@/components/Logo';
import PasswordVisible from '@/components/PasswordVisible';
import SubmitButton from '@/components/SubmitButton';
import { useApiMiddleware } from '@/hooks/useApiMiddleware';
import { EmailRecoverType } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';

const PasswordResetSchema = z.object({
    password: z.string().min(3, { message: "Tiene que tener al menos 3 caracteres!" }),
});

type Schema = z.infer<typeof PasswordResetSchema>

const PasswordReset: FC = (): ReactElement => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { isLoading, apiCall } = useApiMiddleware();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(PasswordResetSchema),
    })

    const togglePasswordVisibility = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }

    const onSubmit = async (fields: Schema) => {
        const oldPassword = searchParams.get("token");
        const userEmail = searchParams.get("email");
        console.log(userEmail)
        const response = await apiCall<EmailRecoverType>(() => ApiAuth.passwordReset(fields.password, oldPassword, userEmail))

        if (isErrorMessage(response)) {
            toast.error(response);
        } else if (isApiResponse<EmailRecoverType>(response)) {
            const { statusCode, message } = response.data;
            if (statusCode == 201) {
                toast.success(message);
                setTimeout(() => {
                    toast.remove();
                    navigate('/');
                }, 2000);
            }
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-start pt-[5%] lg:pt-0 lg:justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo />
                <h2 className="text-center text-3xl font-title font-bold tracking-widest uppercase text-f12-creame">
                    Cambiar Contraseña
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-6">
                    {/* EMAIL */}
                    <div className="h-[60px]">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-f12-creame">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id='password'
                                disabled={isLoading}
                                className="block w-full rounde  d-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
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

                    <div>
                        <SubmitButton disabled={isLoading} isLoading={isLoading} label="Enviar" />
                    </div>
                </form>
                <p className="mt-5 text-center text-sm text-f12-creame">
                    <Link to="/login" className="font-semibold leading-6 text-f12-blue hover:text-f12-blue-light">
                        Volver al Login
                    </Link>
                </p>
                <CustomToaster />
            </div>
        </div>
    )
};

export default PasswordReset;
