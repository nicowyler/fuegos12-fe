import { FC, ReactElement } from 'react';

type LoadingProps = {
    color?: string,
    size?: number,
    alone?: boolean
};

const Loading: FC<LoadingProps> = ({ color, size, alone }: LoadingProps): ReactElement => {

    const defaultColor = 'f12-orange';

    const ring = (
        <div className='fixed top-0 left-0 h-screen w-screen transition-all bg-black bg-opacity-50 ease-in-out flex justify-center items-center'>
            <div className={`inline-block h-${size || 8} w-${size || 8} animate-rotate-360 animate-iteration-count-infinite rounded-full border-2 border-solid  border-r-transparent align-[-0.125em] border-${color || defaultColor}`}>
            </div>
        </div>
    );

    if (alone) {
        return (
            <div className={`inline-block h-${size || 8} w-${size || 8} animate-rotate-360 animate-iteration-count-infinite rounded-full border-2 border-solid  border-r-transparent align-[-0.125em] border-${color || defaultColor}`}>
            </div>
        );
    }

    if (size) {
        return <div className={`flex justify-center items-center h-${size || 8} w-${size || 8}`}>{ring}</div>
    } else return ring;
};

export default Loading;
