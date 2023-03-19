import { useAppDispatch, useAppSelector } from 'hooks';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { usersBanService } from 'services/users/usersBanService';
import { getUsersError, getUsersIsError, getUsersIsLoading } from 'store/slices/usersSlice/usersSlice';
import { Button, ButtonType, Input, InputType, Modal, ModalProps, Text } from 'ui/components/kit';
import cls from './style.module.scss';

interface ModalBanProps extends Omit<ModalProps, 'children'> {
    selectedEmail: string;
}

export const ModalBan = (props: ModalBanProps) => {
    const { selectedEmail, ...otherProps } = props;

    const [ banReason, setBanReason ] = useState('');

    const error = useAppSelector(getUsersError);
    const isError = useAppSelector(getUsersIsError);
    const isLoading = useAppSelector(getUsersIsLoading);
    const dispatch = useAppDispatch();

    const changeBanReason = (value: string) => {
        setBanReason(value);
    };

    const handleBan = async () => {
        const data = await dispatch(usersBanService({
            email: selectedEmail,
            reason: banReason,
        }));

        if (data.meta.requestStatus === 'fulfilled') {
            toast.success('Пользователь успешно забанен');
            props.onClose();
        } else {
            toast.error('Что-то пошло не так');
        }
    };

    return (
        <Modal
            classNameIcon={cls.icon}
            classNameWrapper={cls.modal}
            {...otherProps}
        >
            <div className={cls.modalBan}>
                <Text
                    className={cls.title}
                >Бан пользователя {selectedEmail}</Text>
                {isError && <Text className={cls.error}>{error}</Text>}
                <div className={cls.blockInput}>
                    <Input
                        labelText="Причина блокировки"
                        classNameContainer={cls.inputBanContainer}
                        inputType={InputType.BOTTOM_LINE}
                        className={cls.inputBan}
                        placeholder="Введите причину бана"
                        onChange={changeBanReason}
                    />
                </div>
                <div className={cls.btnsContainer}>
                    <Button
                        className={cls.btnCancel}
                        onClick={() => props.onClose()}
                        disabled={isLoading}
                    >
                        Отмена
                    </Button>
                    <Button
                        className={cls.btnAuth}
                        btnType={ButtonType.ERROR}
                        onClick={handleBan}
                        disabled={isLoading}
                    >
                        Забанить
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
