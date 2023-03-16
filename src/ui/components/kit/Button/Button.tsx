import { ReactNode } from 'react';
import cls from './style.module.scss';
import classNames from 'classnames';

export enum ButtonType {
    PRIMARY = 'primary',
    OUTLINE = 'outline'
}

export enum ButtonSize {
    S = 'S',
    M = 'M',
    L = 'L'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    btnType?: ButtonType;
    btnSize?: ButtonSize;
}

export const Button = (props: ButtonProps) => {
    const {
        className,
        children,
        btnType = ButtonType.PRIMARY,
        btnSize = ButtonSize.M,
        disabled,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(cls.btn, {
                [cls.disabled]: disabled,
            }, className, cls[btnType], cls[btnSize])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
};
