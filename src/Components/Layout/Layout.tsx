import React from 'react';
import {Header} from './Header';

import './Layout.css';

export type LayoutProps = {
    children: string | JSX.Element;
};
const Layout = ({children}: LayoutProps) => {
    return (
        <div className="layout">
            <header className="header__navigation">
                <Header/>
            </header>
            <article>
                {children}
            </article>
        </div>
    );
};

export default Layout;