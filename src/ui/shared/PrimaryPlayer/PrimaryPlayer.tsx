import { __API__ } from 'config/const/api';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getNavbarHide } from 'store/slices/navbarSlice/navbarSlice';
import {
    changeDuration,
    changeTrackDuration,
    changeTrackVolume, getDuration, getPlayTrack, getTrack,
    getTrackInfo,
    getTrackVolume,
    handleTrackNext,
    handleTrackPrev,
    onPauseTrack,
    onPlayTrack
} from 'store/slices/trackSlice/trackSlice';
import cls from './style.module.scss';
import classNames from 'classnames';
import { Button, Text } from 'ui/components/kit';
import { useState } from 'react';
import { calculateDurationTrack } from 'config/utils/calculateDurationTrack';
import { BsFillVolumeDownFill, BsRepeat1 } from 'react-icons/bs';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { getMusicTracks } from 'store/slices/musicSlice/musicSlice';

export const PrimaryPlayer = () => {
    const track = useAppSelector(getTrackInfo);
    const isHide = useAppSelector(getNavbarHide);
    const audio = useAppSelector(getTrack);
    const volume = useAppSelector(getTrackVolume);
    const duration = useAppSelector(getDuration);
    const isPlay = useAppSelector(getPlayTrack);
    const tracks = useAppSelector(getMusicTracks);
    const dispatch = useAppDispatch();

    const [ show, setShow ] = useState(false);
    const [ repeat, setRepeat ] = useState(false);
    const [ changedDuration, setChangedDuration ] = useState(0);

    if(!track) {
        return null;
    }

    audio.onloadedmetadata = () => {
        setChangedDuration(audio.currentTime);
        dispatch(changeDuration(Math.floor(audio.duration)));
    };

    audio.ontimeupdate = () => {
        setChangedDuration(Math.floor(audio.currentTime));

        if(changedDuration + 1 === duration) {
            if (repeat) {
                setChangedDuration(0);
                dispatch(changeTrackDuration(0));
            } else {
                handleNext();
            }
        }
    };

    const changeCurrentDuration = (value: number) => {
        setChangedDuration(value);
        dispatch(changeTrackDuration(value));
    };

    const changeVolume = (value: number) => {
        dispatch(changeTrackVolume(value / 100));
    };

    const handlePlay = () => {
        dispatch(onPlayTrack());
    };

    const handlePause = () => {
        dispatch(onPauseTrack());
    };

    const handleNext = () => {
        dispatch(handleTrackNext(tracks));
    };

    const handlePrev = () => {
        dispatch(handleTrackPrev(tracks));
    };

    return (
        <div className={classNames(cls.primaryPlayer, {
            [cls.hide]: !isHide,
        })}>
            <div className={cls.btnsContainer}>
                <Button className={cls.playBtn} onClick={handlePrev}>
                    <BiSkipPrevious className={cls.playIcon} />
                </Button>
                {isPlay ? (
                    <Button className={cls.playBtn} onClick={handlePause}>
                        <AiFillPauseCircle className={cls.playIcon} />
                    </Button>
                ) : (
                    <Button className={cls.playBtn} onClick={handlePlay}>
                        <AiFillPlayCircle className={cls.playIcon} />
                    </Button>
                )}
                <Button className={cls.playBtn} onClick={handleNext}>
                    <BiSkipNext className={cls.playIcon} />
                </Button>
                <Button className={cls.playBtn} onClick={() => setRepeat((prev) => !prev)}>
                    <BsRepeat1 className={classNames(cls.repeatIcon, {
                        [cls.repeat]: repeat,
                    })} />
                </Button>
            </div>
            <div className={cls.info}>
                <img className={cls.img} src={`${__API__}/${track?.imagePath}`} />
                <div className={cls.infoText}>
                    <Text className={cls.artistName}>{track?.artist.name}</Text>
                    <Text className={cls.trackName}>{track?.name}</Text>
                </div>
            </div>
            <div className={cls.containerDuration}>
                <div className={cls.durationText}>
                    <Text className={cls.left}>0:00</Text>
                    <Text className={cls.right}>{calculateDurationTrack(duration)}</Text>
                </div>
                <input
                    type="range"
                    className={cls.duration}
                    max={duration}
                    value={changedDuration}
                    onChange={(e) => changeCurrentDuration(Number(e.target.value) ?? 0)}
                />
                <div
                    className={cls.dumb}
                    style={{
                        left: `${Math.floor((990 / duration) * changedDuration)}px`,
                    }}
                >
                    <Text className={cls.textDumb}>{calculateDurationTrack(changedDuration)}</Text>
                </div>
            </div>
            <div className={cls.volumeContainer}>
                <Button
                    className={cls.volumeBtn}
                    onClick={() => setShow(prev => !prev)}
                >
                    <BsFillVolumeDownFill className={cls.volumeIcon} />
                </Button>
                {show && (
                    <div className={cls.containerVolume}>
                        <input
                            type="range"
                            className={cls.volume}
                            max={100}
                            value={volume * 100}
                            onChange={(e) => changeVolume(Number(e.target.value) ?? 0)}
                        />
                        <div
                            className={cls.dumbVolume}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
