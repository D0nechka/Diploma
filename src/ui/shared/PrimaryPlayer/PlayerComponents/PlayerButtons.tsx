import { useAppDispatch, useAppSelector } from 'hooks';
import {
    getPlayTrack,
    handleTrackNext,
    handleTrackPrev,
    onPauseTrack,
    onPlayTrack
} from 'store/slices/trackSlice/trackSlice';
import cls from './style.module.scss';
import classNames from 'classnames';
import { Button } from 'ui/components/kit';
import { useState } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { getMusicTracks } from 'store/slices/musicSlice/musicSlice';
import { BsRepeat1 } from 'react-icons/bs';

export const PlayerButtons = () => {

    const isPlay = useAppSelector(getPlayTrack);
    const tracks = useAppSelector(getMusicTracks);
    const dispatch = useAppDispatch();

    const [ repeat, setRepeat ] = useState(false);

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

    return(
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
    );
};