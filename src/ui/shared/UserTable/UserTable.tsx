import { User } from 'store/slices/usersSlice/types';
import { Button, ButtonType, Text } from 'ui/components/kit';
import cls from './style.module.scss';
import { FaUserCircle, FaUserSlash } from 'react-icons/fa';
import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from 'hooks';
import { getUsersIsLoading } from 'store/slices/usersSlice/usersSlice';
import { usersUnBanService } from 'services/users/usersUnBanService';
import { toast } from 'react-toastify';

interface UserTableProps {
    email: string;
    banned: boolean;
    banReason: string | null;
    roles: User['roles'];
    handleOpenBanModal: (id: string) => void;
    handleOpenSelectedModal: (id: string, roles: User['roles']) => void;
}

export const UserTable = (props: UserTableProps) => {
    const {
        email,
        banned,
        banReason,
        roles,
        handleOpenBanModal,
        handleOpenSelectedModal,
    } = props;

    const [ show, setShow ] = useState(false);

    const isLoading = useAppSelector(getUsersIsLoading);
    const dispatch = useAppDispatch();

    const onHover = () => setShow(true);
    const onLeave = () => setShow(false);

    const handleUnBan = async () => {
        const data = await dispatch(usersUnBanService({
            email,
        }));

        if (data.meta.requestStatus === 'fulfilled') {
            toast.success('Пользователь успешно Разбанен');
        } else {
            toast.error('Что-то пошло не так');
        }
    };

    return (
        <div className={cls.userTable}>
            <div className={cls.emailBlock}>
                {banned ? <FaUserSlash className={cls.iconUser} /> : <FaUserCircle className={cls.iconUser} />}
                <Text className={cls.email}>{email}</Text>
            </div>
            <div className={cls.roles}>
                {roles.map((role) => (
                    <Text
                        key={role.id}
                        className={cls.role}
                    >{role.value}</Text>
                ))}
            </div>
            <div className={classNames(cls.banned, {
                [cls.isBanned]: banned,
            })} onMouseEnter={onHover} onMouseLeave={onLeave}>
                {banned && <div className={classNames(cls.tooltip, {
                    [cls.showTooltip]: show,
                })}>
                    <Text>{banReason}</Text>
                </div>}
                <Text
                    className={cls.bannedText}
                >{banned ? 'Забанен' : 'Активен'}</Text>
            </div>
            <div className={cls.actions}>
                {banned ?
                    <Button disabled={isLoading} onClick={handleUnBan}>Разбанить</Button>
                    : <Button
                        className={cls.btnBan}
                        btnType={ButtonType.ERROR}
                        onClick={() => handleOpenBanModal(email)}
                        disabled={isLoading}
                    >Забанить</Button>
                }
                <Button
                    className={cls.giveRole}
                    btnType={ButtonType.OUTLINE}
                    disabled={isLoading}
                    onClick={() => handleOpenSelectedModal(email, roles)}
                >Выдать роль</Button>
            </div>
        </div>
    );
};
