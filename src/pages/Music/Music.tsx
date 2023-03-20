import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { musicGetService } from 'services/music/musicGetService';
import { getMusicTracks } from 'store/slices/musicSlice/musicSlice';
import { Button, Input, InputType, MusicCard } from 'ui/components/kit';
import cls from './style.module.scss';

const Music = () => {
    const tracks = useAppSelector(getMusicTracks);
    const dispatch = useAppDispatch();
    const countCards = 10;
    const countPages = Math.ceil(tracks.length / countCards);
    const currentPage = 2 ;
    const paggingArray = Array.from(Array(countPages+1).keys()).slice(1);
    const musicPage = tracks.slice(countCards * (currentPage - 1), countCards * currentPage);
    console.log(paggingArray.values);

    useEffect(() => {
        dispatch(musicGetService());
    }, []);

    return (
        <div className={cls.music}>
            <div className={cls.inputContainer}>
                <AiOutlineSearch className={cls.logo} />
                <Input
                    className={cls.search}
                    placeholder="search"
                    inputType={InputType.BOTTOM_LINE}
                />
            </div>

            <div className={cls.cardWrapper}>
                {musicPage.map((track) => (
                    <MusicCard
                        key={track.id}
                        pathImg={track.imagePath}
                        name={track.name}
                        artistName={track.artist.name}
                    />
                ))}
            </div>
            <div className={cls.paginationButtons}>
                {paggingArray.map((page) => (
                    <Button className={cls.button}
                        key={page}
                    >
                        {page}</Button>
                ))}

            </div>
        </div>
    );
};

export default Music;