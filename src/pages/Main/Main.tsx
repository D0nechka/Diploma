import cls from './style.module.scss';
import bg from 'config/assets/background.jpg';
import { Logo } from 'ui/components/icons';
import { AuthBlock } from './components/AuthBlock/AuthBlock';

const Main = () => (
    <div className={cls.main}>
        <Logo size={600} className={cls.logo} />
        <AuthBlock />
        <img src={bg} className={cls.img} />
    </div>
);

export default Main;
