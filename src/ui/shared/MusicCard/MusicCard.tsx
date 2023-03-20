import { __API__ } from 'config/const/api';
import { Text } from '../../components/kit/Text/Text';
import cls from './style.module.scss';
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { Button } from 'ui/components/kit';
import { Track } from 'store/slices/musicSlice/types';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    changeTrackInfo,
    getPlayTrack,
    getTrackInfo,
    onPauseTrack,
    onPlayTrack
} from 'store/slices/trackSlice/trackSlice';

interface MusicCardProps {
    track: Track
}

export const MusicCard = (props: MusicCardProps) => {
    const {
        name,
        imagePath,
        artist,
    } = props.track;

    const dispatch = useAppDispatch();
    const isPlay = useAppSelector(getPlayTrack);
    const trackInfo = useAppSelector(getTrackInfo);

    const handleChooseTrack = () =>{
        dispatch(changeTrackInfo(props.track));
        dispatch(onPlayTrack());
    };

    const handlePause = () => {
        dispatch(onPauseTrack());
    };

    return (
        <div className={cls.musicCard}>
            <img src={`${__API__}/${imagePath}`} className={cls.img} />
            <Text className={cls.title}>
                {name}
            </Text>
            <Text className={cls.artist}>
                {artist.name}
            </Text>
            {isPlay && trackInfo?.id === props.track.id ? (
                <Button className={cls.btnPlay} onClick={handlePause}>
                    <BsPauseCircle className={cls.play} />
                </Button>
            ): (
                <Button className={cls.btnPlay} onClick={handleChooseTrack}>
                    <BsPlayCircle className={cls.play} />
                </Button>
            )}
        </div>
    );
};
