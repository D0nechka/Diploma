import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { musicGetService } from 'services/music/musicGetService';
import { getMusicTracks } from 'store/slices/musicSlice/musicSlice';
import { MusicCard } from 'ui/components/kit';
import cls from './style.module.scss';

const Music = () => {
    const tracks = useAppSelector(getMusicTracks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(musicGetService());
    }, []);

    return (
        <div className={cls.music}>
            <div className={cls.cardWrapper}>
                {tracks.map((track) => (
                    <MusicCard
                        key={track.id}
                        pathImg={track.imagePath}
                        name={track.name}
                        artistName={track.artist.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default Music;