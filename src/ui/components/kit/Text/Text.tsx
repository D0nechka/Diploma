import { ReactNode } from 'react';
import classNames from 'classnames';
import cls from './style.module.scss';

export enum TextType {
    PRIMARY = 'primary',
    DARK = 'dark',
    LIGHT = 'light',
}

export enum TextSize {
    S = 's',
    M = 'm',
    L = 'l'
}

interface TextProps {
    children: ReactNode;
    textSize?: TextSize;
    textType?: TextType;
    className?: string;
}

export const Text = (props: TextProps) => {
    const {
        textSize = TextSize.M,
        textType = TextType.PRIMARY,
        children,
        className,
    } = props;

    return (
        <span className={classNames(cls.text, {}, className, cls[textSize], cls[textType])}>
            {children}
        </span>
    );
};
