import { FC, ReactElement } from 'react';

type LoadingProps = {
    color?: string,
    size?: number
};

const Loading: FC<LoadingProps> = ({ color, size }: LoadingProps): ReactElement => {

    const defaultColor = 'f12-orange';

    const ring = (
        <div className={`inline-block h-full w-full animate-rotate-360 animate-iteration-count-infinite rounded-full border-2 border-solid  border-r-transparent align-[-0.125em] border-${color || defaultColor}`}>
        </div>
    );

    if (size) {
        return <div className={`flex justify-center items-center h-${size || 8} w-${size || 8}`}>{ring}</div>
    } else return ring;
};

export default Loading;
