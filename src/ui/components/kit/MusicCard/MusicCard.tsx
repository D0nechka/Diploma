import { __API__ } from 'config/const/api';
import { Text } from '../Text/Text';
import cls from './style.module.scss';

interface MusicCardProps {
    pathImg: string;
    name: string;
    artistName: string;
}

export const MusicCard = (props: MusicCardProps) => {
    const {
        pathImg,
        name,
        artistName,
    } = props;

    return (
        <div className={cls.musicCard}>
            <img src={`http://localhost:7777/${pathImg}`} className={cls.img} />
            <Text className={cls.title}>
                {name}
            </Text>
            <Text className={cls.artist}>
                {artistName}
            </Text>
        </div>
    );
};