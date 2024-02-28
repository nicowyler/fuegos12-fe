import { FC, ReactElement } from 'react';
import logo from '../assets/logo-fuegos12.svg';

const Logo: FC = (): ReactElement => {
    return (
        <img style={{ aspectRatio: '1/1', width: '100%', maxHeight: '16rem' }}
            src={logo}
            alt="Your Company"
        />
    )
};

export default Logo;
