import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { artistsGetService } from 'services/artists/artistsGetService';
import { getArtistsInfo } from 'store/slices/artistsSlice/artistsSlice';
import { Input, Text, InputType, Button, ButtonType } from 'ui/components/kit';
import cls from './style.module.scss';

const MusicAdmin = () => {
    const [ currentArtist, setCurrentArtist ] = useState({ value: '', label: '', });

    const refImg = useRef<HTMLInputElement | null>(null);
    const refMusic = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    const artists = useAppSelector(getArtistsInfo);

    const handleChangeArtist = (newValue: SingleValue<any>) => {
        setCurrentArtist(newValue);
    };

    const chooseImg = () => {
        refImg.current?.click();
    };
    const chooseMusic = () => {
        refMusic.current?.click();
    };

    useEffect(() => {
        dispatch(artistsGetService());
    }, []);

    return (
        <div className={cls.musicAdmin}>
            <div className={cls.musicAdminWrapper}>
                <Text
                    className={cls.title}
                >Создание музыки</Text>
                <Input
                    placeholder="Название трека"
                    className={cls.inputName}
                    classNameContainer={cls.inputNameContainer}
                    inputType={InputType.BOTTOM_LINE}
                    labelText="Название трека"
                />
                <Text className={cls.selectLabel}>Выберите артиста</Text>
                <Select
                    className={cls.select}
                    options={artists.map((role) => ({
                        value: role.name, label: role.name,
                    }))}
                    placeholder="Выберите артиста"
                    value={currentArtist}
                    onChange={handleChangeArtist}
                />
                <Text className={cls.textImg}>Выберите фотографию</Text>
                <input
                    type="file"
                    className={cls.inputImg}
                    ref={refImg}
                />
                <Button
                    btnType={ButtonType.OUTLINE}
                    className={cls.btnImg}
                    onClick={chooseImg}
                >Выберите файл</Button>
                <Text className={cls.textMusic}>Выберите музыку</Text>
                <input
                    type="file"
                    className={cls.inputMusic}
                    ref={refMusic}
                />
                <Button
                    btnType={ButtonType.OUTLINE}
                    className={cls.btnMusic}
                    onClick={chooseMusic}
                >Выберите файл</Button>
                <Button className={cls.btnCreate}>Создать</Button>
            </div>
        </div>
    );
};

export default MusicAdmin;
