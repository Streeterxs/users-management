import React, { useState } from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../Store/Store';

const Header = () => {
    const [activeItem, setActiveItem] = useState('home');
    const {coreReducer} = useSelector((state: RootState) => state);

    console.log('token: ', coreReducer.token);
    console.log('isLogged', coreReducer.isLogged);

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => setActiveItem(name ? name : '');

    return (
        <nav className="padx-2">
            <Menu text size="small">
                <Menu.Item header onClick={console.log}>User Manager</Menu.Item>
                <Menu.Item
                    name='User Creation'
                    active={activeItem === 'User Creation'}
                    onClick={handleItemClick}
                />
                <Menu.Item
                    name='friends'
                    active={activeItem === 'friends'}
                    onClick={handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name={coreReducer?.isLogged ? 'logado' : 'deslogado'}
                        onClick={handleItemClick}
                        />
                    <Menu.Item
                    name={coreReducer?.isLogged ? 'logout' : 'login'}
                    onClick={handleItemClick}
                    />
                </Menu.Menu>
            </Menu>
        </nav>
    );
};

export default Header;