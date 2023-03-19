import { GiDualityMask } from 'react-icons/gi';
import { Text } from '../../components/kit/Text/Text';
import cls from './style.module.scss';

interface ArtistCardProps {
    name: string;
    id:number;
}

export const ArtistCard = (props: ArtistCardProps) => {
    const {
        name,
        id,
    } = props;
    return(
        <div className={cls.artistCard}>
            <GiDualityMask className={cls.logo}/>
            <Text className={cls.name}>
                {name}
            </Text>
            <Text className={cls.id}>
                {id}
            </Text>
        </div>
    );
};