import { useState } from 'react';
import { BiLogIn } from 'react-icons/bi';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { Button, ButtonSize, ButtonType, Text, TextType } from 'ui/components/kit';
import { ModalAuth, ModalReg } from 'ui/components/modals';
import cls from './style.module.scss';

export const AuthBlock = () => {
    const [ isOpenAuth, setIsOpenAuth ] = useState(false);
    const [ isOpenReg, setIsOpenReg ] = useState(false);

    const onOpenAuth = () => setIsOpenAuth(true);
    const onCloseAuth = () => setIsOpenAuth(false);

    const onOpenReg = () => setIsOpenReg(true);
    const onCloseReg = () => setIsOpenReg(false);

    return (
        <div className={cls.welcome}>
            <ModalAuth isOpen={isOpenAuth} onClose={onCloseAuth} />
            <ModalReg isOpen={isOpenReg} onClose={onCloseReg} />
            <Text
                textType={TextType.LIGHT}
                className={cls.welcomeText}
            >
                Музыка с нашим приложением
            </Text>
            <Text
                textType={TextType.PRIMARY}
                className={cls.describe}
            >
                Слушайте лучшую музыку бесплатно и пользуйтесь нашим приложениям пока
            </Text>
            <div className={cls.btns}>
                <Button
                    btnType={ButtonType.OUTLINE}
                    className={cls.authBtn}
                    btnSize={ButtonSize.L}
                    onClick={onOpenAuth}
                >
                    Войти
                    <BiLogIn />
                </Button>
                <Button
                    className={cls.regBtn}
                    btnSize={ButtonSize.L}
                    onClick={onOpenReg}
                >
                    Зарегистрироваться
                    <RxOpenInNewWindow />
                </Button>
            </div>
        </div>
    );
};
