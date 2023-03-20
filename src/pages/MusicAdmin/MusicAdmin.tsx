import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useRef, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import { artistsGetService } from 'services/artists/artistsGetService';
import { musicAddService } from 'services/music/musicAddService';
import { getArtistsInfo } from 'store/slices/artistsSlice/artistsSlice';
import { getMusicIsLoading } from 'store/slices/musicSlice/musicSlice';
import { Input, Text, InputType, Button, ButtonType } from 'ui/components/kit';
import cls from './style.module.scss';

const MusicAdmin = () => {
    const [ currentArtist, setCurrentArtist ] = useState({ value: '', label: '', });
    const [ name, setName ] = useState('');
    const [ picture, setPicture ] = useState<FileList[0] | null>(null);
    const [ audio, setAudio ] = useState<FileList[0] | null>(null);

    const refImg = useRef<HTMLInputElement | null>(null);
    const refMusic = useRef<HTMLInputElement | null>(null);

    const dispatch = useAppDispatch();
    const artists = useAppSelector(getArtistsInfo);
    const isLoading = useAppSelector(getMusicIsLoading);

    const handleChangeArtist = (newValue: SingleValue<any>) => {
        setCurrentArtist(newValue);
    };

    const handleChangeName = (value: string) => {
        setName(value);
    };

    const handleChangePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.files?.[0]){
            setPicture(e.target.files[0]);
        }
    };

    const handleChangeAudio = (e: any) => {
        if(e?.target?.files?.[0]){
            setAudio(e.target.files[0]);
        }
    };

    const chooseImg = () => {
        refImg.current?.click();
    };
    const chooseMusic = () => {
        refMusic.current?.click();
    };

    const handleCreate = async () => {
        if(picture && audio) {
            const data = await dispatch(musicAddService({
                name,
                artistsId: currentArtist.value,
                picture,
                audio,
            }));

            if (data.meta.requestStatus === 'fulfilled') {
                toast.success('Трек добавлен');
                setName('');
                setPicture(null);
                setAudio(null);
                setCurrentArtist({ value: '', label: '', });
            } else {
                toast.error('Что-то пошло не так');
            }
        }
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
                    onChange={handleChangeName}
                    value={name}
                />
                <Text className={cls.selectLabel}>Выберите артиста</Text>
                <Select
                    className={cls.select}
                    options={artists.map((role) => ({
                        value: String(role.id), label: role.name,
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
                    onChange={handleChangePicture}
                    accept=".jpg,.jpeg,.png"
                />
                <Button
                    btnType={ButtonType.OUTLINE}
                    className={cls.btnImg}
                    onClick={chooseImg}
                >Выберите файл</Button>
                {picture && (<img className={cls.previewImg} src={URL.createObjectURL(picture)} />)}
                {audio && <Text className={cls.musicName}>{audio?.name}</Text>}
                <Text className={cls.textMusic}>Выберите музыку</Text>
                <input
                    type="file"
                    className={cls.inputMusic}
                    ref={refMusic}
                    onChange={handleChangeAudio}
                    accept=".mp3"
                />
                <Button
                    btnType={ButtonType.OUTLINE}
                    className={cls.btnMusic}
                    onClick={chooseMusic}
                >Выберите файл</Button>
                <Button
                    className={cls.btnCreate}
                    onClick={handleCreate}
                    disabled={!name.trim().length || !picture || !audio || !currentArtist.value.trim() || isLoading}
                >Создать</Button>
            </div>
        </div>
    );
};

export default MusicAdmin;
