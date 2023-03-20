import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { artistsGetService } from 'services/artists/artistsGetService';
import { getArtistsInfo } from 'store/slices/artistsSlice/artistsSlice';
import { Text , TextSize } from 'ui/components/kit';
import { ArtistCard } from 'ui/shared/ArtistCard/ArtistCard';
import cls from './style.module.scss';

const Artists = () => {
    const artists = useAppSelector(getArtistsInfo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(artistsGetService());
    }, []);

    return (
        <div className={cls.artists}>
            <Text
                textSize={TextSize.L}
                className={cls.title}
            >
                Список всех исполнителей
            </Text>
            <div>
                {artists.map((artist) => (
                    <ArtistCard
                        key={artist.id}
                        id={artist.id}
                        name={artist.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default Artists;
