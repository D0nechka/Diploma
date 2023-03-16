import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';
import { authService } from 'services/auth/authService';
import {
    changeLoginError,
    getLoginError,
    getLoginIsError,
    getLoginIsLoading
} from 'store/slices/loginSlice/loginSlice';
import { Button, Input, InputType, Modal, ModalProps, Text } from 'ui/components/kit';
import cls from './style.module.scss';

export const ModalAuth = (props: Omit<ModalProps, 'children'>) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const error = useAppSelector(getLoginError);
    const isError = useAppSelector(getLoginIsError);
    const isLoading = useAppSelector(getLoginIsLoading);

    const dispatch = useAppDispatch();

    const changeEmail = (value: string) => {
        setEmail(value);
    };

    const changePassword = (value: string) => {
        setPassword(value);
    };

    const handleReset = () => {
        setEmail('');
        setPassword('');
        dispatch(changeLoginError(''));
    };

    const handleRegistration = async () => {
        const data = await dispatch(authService({
            email,
            password,
        }));

        if (data.meta.requestStatus === 'fulfilled') {
            window.location.reload();
        }
    };

    return (
        <Modal
            classNameIcon={cls.icon}
            classNameWrapper={cls.modal}
            {...props}
        >
            <div className={cls.modalAuth}>
                <Text
                    className={cls.title}
                >Авторизация</Text>
                {isError && <Text className={cls.error}>{error}</Text>}
                <div className={cls.blockInput}>
                    <Input
                        labelText="Email"
                        classNameContainer={cls.inputEmailContainer}
                        inputType={InputType.BOTTOM_LINE}
                        className={cls.inputEmail}
                        placeholder="Введите ваш email"
                        onChange={changeEmail}
                    />
                    <Input
                        labelText="Pasword"
                        type="password"
                        classNameContainer={cls.inputPasswordContainer}
                        inputType={InputType.BOTTOM_LINE}
                        className={cls.inputEmail}
                        placeholder="Введите ваш пароль"
                        onChange={changePassword}
                    />
                </div>
                <div className={cls.btnsContainer}>
                    <Button
                        className={cls.btnReset}
                        onClick={handleReset}
                        disabled={isLoading}
                    >
                        Сбросить
                    </Button>
                    <Button
                        className={cls.btnAuth}
                        onClick={handleRegistration}
                        disabled={isLoading}
                    >
                        Войти
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
