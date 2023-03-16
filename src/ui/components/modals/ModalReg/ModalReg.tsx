import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';
import { registrationService } from 'services/registration/registrationService';
import { changeRegError, getRegError, getRegIsError, getRegIsLoading } from 'store/slices/regSlice/regSlice';
import { Button, Input, InputType, Modal, ModalProps, Text } from 'ui/components/kit';
import cls from './style.module.scss';

export const ModalReg = (props: Omit<ModalProps, 'children'>) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const error = useAppSelector(getRegError);
    const isError = useAppSelector(getRegIsError);
    const isLoading = useAppSelector(getRegIsLoading);

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
        dispatch(changeRegError(''));
    };

    const handleRegistration = async () => {
        const data = await dispatch(registrationService({
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
                >Регистрация</Text>
                {isError && <Text className={cls.error}>{error}</Text>}
                <div className={cls.blockInput}>
                    <Input
                        labelText="Email"
                        classNameContainer={cls.inputEmailContainer}
                        inputType={InputType.BOTTOM_LINE}
                        className={cls.inputEmail}
                        placeholder="Введите ваш email"
                        onChange={changeEmail}
                        value={email}
                    />
                    <Input
                        labelText="Pasword"
                        type="password"
                        classNameContainer={cls.inputPasswordContainer}
                        inputType={InputType.BOTTOM_LINE}
                        className={cls.inputEmail}
                        placeholder="Введите ваш пароль"
                        onChange={changePassword}
                        value={password}
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
                        Зарегистрироваться
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
