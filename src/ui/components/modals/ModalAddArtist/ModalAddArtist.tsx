import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { artistsAddService } from 'services/artists/artistAddService';
import { getArtistsError, getArtistsIsError, getArtistsIsLoading } from 'store/slices/artistsSlice/artistsSlice';
import { Button, Input, InputType, Modal, ModalProps, Text } from 'ui/components/kit';
import cls from './style.module.scss';

export const ModalAddArtist = (props: Omit<ModalProps, 'children'>) => {
    const [ name, setName ] = useState('');

    const error = useAppSelector(getArtistsError);
    const isError = useAppSelector(getArtistsIsError);
    const isLoading = useAppSelector(getArtistsIsLoading);

    const dispatch = useAppDispatch();

    const changeName = (value: string) => {
        setName(value);
    };

    const handleRegistration = async () => {
        const data = await dispatch(artistsAddService({
            name,
        }));

        if (data.meta.requestStatus === 'fulfilled') {
            toast.success('Артист добавлен');
            props.onClose();
        } else {
            toast.error('Что-то пошло не так');
        }
    };

    return (
        <Modal
            classNameIcon={cls.icon}
            classNameWrapper={cls.modal}
            {...props}
        >
            <div className={cls.modalAddArtist}>
                <Text
                    className={cls.title}
                >Создание артиста</Text>
                {isError && <Text className={cls.error}>{error}</Text>}
                <div className={cls.blockInput}>
                    <Input
                        labelText="Имя"
                        classNameContainer={cls.inputNameContainer}
                        inputType={InputType.BOTTOM_LINE}
                        className={cls.inputName}
                        placeholder="Введите имя исполнителя"
                        onChange={changeName}
                        value={name}
                    />
                </div>
                <div className={cls.btnsContainer}>
                    <Button
                        className={cls.btnCreate}
                        onClick={handleRegistration}
                        disabled={isLoading}
                    >
                        Создать
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
