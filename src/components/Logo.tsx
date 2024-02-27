import { FC, ReactElement } from 'react';
import logo from '../assets/logo-fuegos12.svg';

const Logo: FC = (): ReactElement => {
    return (
        <img
            className="mx-auto w-52 h-auto my-2"
            src={logo}
            alt="Your Company"
        />
    )
};

export default Logo;
