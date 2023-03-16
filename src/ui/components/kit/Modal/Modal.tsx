import cls from './style.module.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { ReactNode } from 'react';
import classNames from 'classnames';

export interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    classNameIcon?: string;
    classNameWrapper?: string;
}

export const Modal = (props: ModalProps) => {
    const { isOpen, children, onClose, className, classNameIcon, classNameWrapper, } = props;

    const onDismiss = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    if(!isOpen) {
        return null;
    }

    return (
        <div
            className={classNames(cls.modal, className)}
            onClick={onClose}
        >
            <div
                className={classNames(cls.modalWrapper, classNameWrapper)}
                onClick={onDismiss}
            >
                <AiOutlineClose
                    onClick={onClose}
                    className={classNames(cls.closeIcon, classNameIcon)}
                />
                {children}
            </div>
        </div>
    );
};
