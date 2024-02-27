import Loading from '@/components/Loading';
import { FC, ReactElement, useState } from 'react';

type PayButtonProps = {
    preference: string | null,
    buttonLabel: string,
    disabled: boolean
};

const PayButton: FC<PayButtonProps> = ({ preference, buttonLabel, disabled }: PayButtonProps): ReactElement => {

    const [loading, setLoading] = useState(false);

    const redirect = () => {
        setLoading(true);
        setTimeout(() => {
            preference && window.location.replace(preference);
        }, 300);
    }

    return (
        <button
            disabled={disabled}
            onClick={redirect}
            className="w-full h-12 my-4 flex justify-center items-center rounded-md bg-sky-500 hover:bg-sky-600 disabled:opacity-30">
            {loading ? <Loading size={6} color='white' /> : buttonLabel}
        </button>
    )
};

export default PayButton;
