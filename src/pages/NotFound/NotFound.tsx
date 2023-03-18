import { Logo } from 'ui/components/icons';
import { Text } from 'ui/components/kit';
import cls from './style.module.scss';

export const NotFound = () => (
    <div className={cls.notFound}>
        <Logo />
        <Text className={cls.notFoundText}>Страница не найдена</Text>
    </div>
);
