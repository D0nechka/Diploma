import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { artistsGetService } from 'services/artists/artistsGetService';
import { getArtists, getArtistsIsLoading } from 'store/slices/artistsSlice/artistsSlice';
import { Button, Text, ButtonType } from 'ui/components/kit';
import { ModalAddArtist } from 'ui/components/modals';
import { ArtistTable } from 'ui/shared';
import cls from './style.module.scss';

const AdminArtists = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    const artists = useAppSelector(getArtists);
    const isLoading = useAppSelector(getArtistsIsLoading);
    const dispatch = useAppDispatch();

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    useEffect(() => {
        dispatch(artistsGetService());
    }, []);

    return (
        <div
            className={cls.adminArtists}
        >
            <ModalAddArtist isOpen={isOpen} onClose={handleCloseModal} />
            <Button
                btnType={ButtonType.OUTLINE}
                className={cls.createBtn}
                onClick={handleOpenModal}
            >Создать нового</Button>
            <div className={cls.artistsContainer}>
                <div className={cls.headerTable}>
                    {[ 'Имя' ].map((title) => (
                        <Text
                            key={title}
                            className={cls.titleTable}
                        >{title}</Text>
                    ))}
                </div>
                {isLoading ? <div>Loding...</div> : <div className={cls.bodyTable}>
                    {artists.map((artist) => (
                        <ArtistTable name={artist.name} key={artist.id} />
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default AdminArtists;
