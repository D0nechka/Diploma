import { NavLink } from 'react-router-dom';
import { Text } from 'ui/components/kit';
import { GlobalTypeLinks } from '../../types';
import cls from './style.module.scss';
import classNames from 'classnames';

interface LinksProps {
    currentLinks: GlobalTypeLinks | null;
    isHide: boolean;
}

export const Links = ({
    currentLinks,
    isHide,
}: LinksProps) => (
    <div className={cls.links}>
        {Object.entries(currentLinks ?? {}).map(([ title, array ]) => (
            <div
                key={title}
                className={cls.partLinks}
            >
                <Text className={cls.linkTitle}>{title}</Text>
                {array.map(({ to, icon: Icon, name, }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive, }) => (`${cls.link} ${isActive && cls.linkActive}`)}
                    >
                        <>
                            <Icon className={cls.linkIcon} />
                            <Text className={classNames(cls.linkName, {
                                [cls.linkNameHide]: !isHide,
                            })}>{name}</Text>
                        </>
                    </NavLink>
                ))}
            </div>
        ))}
    </div>
);
