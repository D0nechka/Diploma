import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getUsersError, getUsersIsError, getUsersIsLoading } from 'store/slices/usersSlice/usersSlice';
import { Button, ButtonType, Modal, ModalProps, Text } from 'ui/components/kit';
import cls from './style.module.scss';
import Select, { MultiValue } from 'react-select';
import { rolesGetService } from 'services/roles/rolesGetService';
import { getRoles } from 'store/slices/rolesSlice/rolesSlice';
import { User } from 'store/slices/usersSlice/types';
import { usersGiveRoleService } from 'services/users/usersGiveRoleService';

interface ModalBanProps extends Omit<ModalProps, 'children'> {
    selectedEmail: string;
    selectedRoles: User['roles'];
}

export const ModalGiveRole = (props: ModalBanProps) => {
    const { selectedEmail, selectedRoles, ...otherProps } = props;

    const [ newRoles, setNewRoles ] = useState<MultiValue<any>>([]);

    const error = useAppSelector(getUsersError);
    const isError = useAppSelector(getUsersIsError);
    const isLoading = useAppSelector(getUsersIsLoading);
    const roles = useAppSelector(getRoles);

    const dispatch = useAppDispatch();

    const changeRoles = (newValue: MultiValue<any>) => {
        setNewRoles(newValue);
    };

    const handleGiveRole = async () => {
        const data = await dispatch(usersGiveRoleService({
            email: selectedEmail,
            roles: newRoles.map((item) => item?.value),
        }));

        if (data.meta.requestStatus === 'fulfilled') {
            toast.success('Роли успешно обновлены');
            props.onClose();
        } else {
            toast.error('Что-то пошло не так');
        }
    };

    useEffect(() => {
        dispatch(rolesGetService());
    }, []);

    useLayoutEffect(() => {
        setNewRoles(selectedRoles.map((role) => ({
            label: role.value,
            value: role.value,
        })));
    }, [ selectedRoles ]);

    return (
        <Modal
            classNameIcon={cls.icon}
            classNameWrapper={cls.modal}
            {...otherProps}
        >
            <div className={cls.modalGiveRole}>
                <Text
                    className={cls.title}
                >Выдать роль пользователю {selectedEmail}</Text>
                {isError && <Text className={cls.error}>{error}</Text>}
                <div className={cls.blockInput}>
                    <Select
                        className={cls.select}
                        options={roles.map((role) => ({
                            value: role.value, label: role.value,
                        }))}
                        placeholder="Выберите роль"
                        value={newRoles}
                        isMulti
                        onChange={changeRoles}
                        isDisabled={isLoading}
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
                        className={cls.btnGiveRole}
                        btnType={ButtonType.OUTLINE}
                        onClick={handleGiveRole}
                        disabled={isLoading || !newRoles?.length}
                    >
                        Выдать роль
                    </Button>
                </div>
            </div>
        </Modal>
    );
};
