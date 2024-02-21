import { FC, ReactElement } from 'react';

type MpFeedbackProps = {
    status: string
};

const MpFeedback: FC<MpFeedbackProps> = ({ status }: MpFeedbackProps): ReactElement => {
    return <>pagina de vuelta {status}</>;
};

export default MpFeedback;
