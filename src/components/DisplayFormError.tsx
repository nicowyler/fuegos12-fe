import { FC, ReactElement } from 'react';

type DisplayFormErrorProps = {
    message:string
};

const DisplayFormError: FC<DisplayFormErrorProps> = ({message }: DisplayFormErrorProps ): ReactElement => {
    return <p>{message}</p>
};

export default DisplayFormError;
