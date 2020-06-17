import React, { useState } from 'react';
import { Menu, MenuItemProps } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../Store/Store';
import { useHistory } from 'react-router-dom';
import * as Core from '../../../Store/Core';

const Header = () => {
    const [activeItem, setActiveItem] = useState('home');
    const {coreReducer} = useSelector((state: RootState) => state);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => setActiveItem(name ? name : '');

    const handleAuth = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, { name }: MenuItemProps) => {
        switch (name) {
            case 'login':
                history.push('/login');
                break;
        
            case 'logout':
                dispatch(Core.logout());
                history.push('/login');
                break;
        }
    }
    return (
        <nav className="padx-2">
            <Menu text size="small">
                <Menu.Item header onClick={() => history.push('/')}>User Manager</Menu.Item>
                <Menu.Item
                    name='User Creation'
                    active={activeItem === 'User Creation'}
                    onClick={(e, obj) => {
                        history.push('/create');
                        handleItemClick(e, obj);
                    }}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name={coreReducer?.isLogged ? 'logout' : 'login'}
                        onClick={handleAuth}
                    />
                </Menu.Menu>
            </Menu>
        </nav>
    );
};

export default Header;