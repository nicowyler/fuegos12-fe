import Loading from '@/components/Loading';
import { FC, ReactElement } from 'react';

type SubmitButtonProps = {
    label: string,
    isLoading: boolean,
    disabled: boolean,
    onClick?: () => void
};

const SubmitButton: FC<SubmitButtonProps> = ({ label, isLoading, disabled, onClick }: SubmitButtonProps): ReactElement => {
    return (
        <button
            onClick={onClick}
            disabled={isLoading || disabled}
            type="submit"
            className="mt-8 flex w-full justify-center rounded-md bg-f12-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-f12-orange-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {isLoading ? <Loading alone size={6} /> : label}
        </button>
    )
};

export default SubmitButton;
