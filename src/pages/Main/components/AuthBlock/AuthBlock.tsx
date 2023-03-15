import { BiLogIn } from 'react-icons/bi';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { Button, ButtonSize, ButtonType, Text, TextType } from 'ui/components/kit';
import cls from './style.module.scss';

export const AuthBlock = () => (
    <div className={cls.welcome}>
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
            >
                Войти
                <BiLogIn />
            </Button>
            <Button
                className={cls.regBtn}
                btnSize={ButtonSize.L}
            >
                Зарегистрироваться
                <RxOpenInNewWindow />
            </Button>
        </div>
    </div>
);
