import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { musicGetService } from 'services/music/musicGetService';
import { getMusicIsLoading, getMusicTracks } from 'store/slices/musicSlice/musicSlice';
import { Button, Input, InputType, MusicCard } from 'ui/components/kit';
import cls from './style.module.scss';
import { SkeletonMusicCard } from 'ui/shared';

const countCards = 10;
const skeletonArr = Array.from(Array(10).keys());

const Music = () => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ search, setSearch ] = useState('');

    const tracks = useAppSelector(getMusicTracks);
    const isLoading = useAppSelector(getMusicIsLoading);
    const dispatch = useAppDispatch();

    const changeCurrentPage = (page: number) => {
        setCurrentPage(page);
    };

    const changeSearch = (value: string) => {
        setCurrentPage(1);
        setSearch(value);
    };

    useEffect(() => {
        dispatch(musicGetService());
    }, []);

    const resultFilterTracks = tracks.filter((track) => track.name.toLowerCase().includes(search.toLowerCase()));
    const countPages = Math.ceil(resultFilterTracks.length / countCards);
    const paggingArray = Array.from(Array(countPages + 1).keys()).slice(1);

    return (
        <div className={cls.music}>
            <div className={cls.inputContainer}>
                <AiOutlineSearch className={cls.logo} />
                <Input
                    className={cls.search}
                    placeholder="search"
                    inputType={InputType.BOTTOM_LINE}
                    onChange={changeSearch}
                />
            </div>
            <div className={cls.cardWrapper}>
                {isLoading ? skeletonArr.map((value) => (<SkeletonMusicCard key={value}/>)) : resultFilterTracks
                    .slice(countCards * (currentPage - 1), countCards * currentPage)
                    .map((track) => (
                        <MusicCard
                            key={track.id}
                            track={track}
                        />
                    ))
                }
            </div>
            <div className={cls.paginationButtons}>
                {!isLoading && paggingArray.map((page) => (
                    <Button
                        className={cls.button}
                        key={page}
                        onClick={() => changeCurrentPage(page)}
                    >
                        {page}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Music;
