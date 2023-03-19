import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { usersGetService } from 'services/users/userGetService';
import { User } from 'store/slices/usersSlice/types';
import { getUsers, getUsersIsLoading } from 'store/slices/usersSlice/usersSlice';
import { Text } from 'ui/components/kit';
import { ModalBan, ModalGiveRole } from 'ui/components/modals';
import { UserTable } from 'ui/shared';
import cls from './style.module.scss';

const Users = () => {
    const [ isOpenBanModal, setIsOpenBanModal ] = useState(false);
    const [ isOpenSelectedModal, setIsOpenSelectedModal ] = useState(false);

    const [ selectedRoles, setSelectedRoles ] = useState<User['roles']>([]);
    const [ selectedEmail, setSelectedId ] = useState<string | null>(null);

    const users = useAppSelector(getUsers);
    const isLoading = useAppSelector(getUsersIsLoading);
    const dispatch = useAppDispatch();

    const handleOpenBanModal = (id: string) => {
        setSelectedId(id);
        setIsOpenBanModal(true);
    };
    const handleCloseBanModal = () => {
        setSelectedId(null);
        setIsOpenBanModal(false);
    };

    const handleOpenSelectedModal = (id: string, roles: User['roles']) => {
        setSelectedId(id);
        setSelectedRoles(roles);
        setIsOpenSelectedModal(true);
    };
    const handleCloseSelectedModal = () => {
        setSelectedId(null);
        setSelectedRoles([]);
        setIsOpenSelectedModal(false);
    };

    useEffect(() => {
        dispatch(usersGetService());
    }, []);

    return (
        <div className={cls.users}>
            <ModalBan
                isOpen={isOpenBanModal}
                onClose={handleCloseBanModal}
                selectedEmail={selectedEmail ?? ''}
            />
            <ModalGiveRole
                isOpen={isOpenSelectedModal}
                onClose={handleCloseSelectedModal}
                selectedEmail={selectedEmail ?? ''}
                selectedRoles={selectedRoles}
            />
            <div className={cls.usersContainer}>
                <div className={cls.headerTable}>
                    {[ 'Email', 'Роли', 'Статус', 'Действия' ].map((title) => (
                        <Text
                            key={title}
                            className={cls.titleTable}
                        >{title}</Text>
                    ))}
                </div>
                {isLoading ? <div>Loding...</div> : <div className={cls.bodyTable}>
                    {users.map((user) => (
                        <UserTable
                            key={user.id}
                            email={user.email}
                            banReason={user.banReason}
                            banned={user.banned}
                            roles={user.roles}
                            handleOpenBanModal={handleOpenBanModal}
                            handleOpenSelectedModal={handleOpenSelectedModal}
                        />
                    ))}
                </div>}
            </div>
        </div>
    );
};

export default Users;
