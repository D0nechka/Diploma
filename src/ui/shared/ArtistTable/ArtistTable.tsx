import { Text } from 'ui/components/kit';
import cls from './style.module.scss';
import { FaUserSlash } from 'react-icons/fa';

interface ArtistTableProps {
    name: string;
}

export const ArtistTable = (props: ArtistTableProps) => {
    const {
        name,
    } = props;

    return (
        <div className={cls.artistTable}>
            <div className={cls.nameBlock}>
                <FaUserSlash className={cls.iconArtist} />
                <Text className={cls.name}>{name}</Text>
            </div>
        </div>
    );
};
