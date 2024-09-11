import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { FC, ReactElement } from 'react';

type PayButtonProps = {
    buttonLabel: string,
    disabled?: boolean,
    isLoading: boolean,
    className?: string,
    callback?: () => void
};

function PayButton({ buttonLabel, disabled, callback, isLoading, className }: PayButtonProps): ReactElement {

    const handleOnClick = () => {
        callback && callback();
    }

    return (
        <Button
            className={className}
            type="submit"
            variant="pay"
            disabled={disabled}
            onClick={handleOnClick}
        >
            {isLoading ? <Loading alone size={6} color='white' /> : buttonLabel}
        </Button>
    )
};

export default PayButton;
