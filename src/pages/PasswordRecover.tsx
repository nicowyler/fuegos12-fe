import { ApiAuth } from '@/api';
import { isApiResponse, isErrorMessage } from '@/api/guards';
import CustomToaster from '@/components/CustomToaster';
import Logo from '@/components/Logo';
import SubmitButton from '@/components/SubmitButton';
import { useApiMiddleware } from '@/hooks/useApiMiddleware';
import { EmailRecoverType } from '@/types';
import { ErrorMessage } from '@hookform/error-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const PasswordRecoverSchema = z.object({
    email: z.string().min(1, { message: "Tienes que completar este campo!" }).email("Ingresa un email valido!"),
});

type Schema = z.infer<typeof PasswordRecoverSchema>


const PasswordRecover: FC = (): ReactElement => {
    const { isLoading, apiCall } = useApiMiddleware();
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(PasswordRecoverSchema),
    })
    const onSubmit = async (fields: Schema) => {

        const response = await apiCall<EmailRecoverType>(() => ApiAuth.passwordRecover(fields.email))
        console.log(response);
        if (isErrorMessage(response)) {
            toast.error(response);
        } else if (isApiResponse<EmailRecoverType>(response)) {
            const { data } = response.data;
            console.log(data);
        }
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-start pt-[5%] lg:pt-0 lg:justify-center px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Logo />
                <h2 className="text-center text-3xl font-title font-bold tracking-widest uppercase text-f12-creame">
                    Recuperar Contraseña
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit((data) => onSubmit(data))} className="space-y-6">
                    {/* EMAIL */}
                    <div className="h-[60px]">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-f12-creame">
                            Email
                        </label>
                        <div>
                            <input disabled={isLoading}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-f12-orange sm:text-sm sm:leading-6"
                                {...register("email")} />
                            <ErrorMessage errors={errors} name="email"
                                render={({ message }) =>
                                    <p className="text-red-400 text-sm pt-1">{message}</p>
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <SubmitButton isLoading={isLoading} label="Enviar" />
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

export default PasswordRecover;
