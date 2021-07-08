import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';

import { Calendar } from './pages/Calendar';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';


import { Login } from './pages/Login';

import { useAuthState } from './context';

import Menu from './config/Menu';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './App.scss';

const App = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const [sidebarActive, setSidebarActive] = useState(true);
    const sidebar = useRef();

    const history = useHistory();

    let menuClick = false;

    useEffect(() => {
        if (sidebarActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [sidebarActive]);


    const onWrapperClick = (event) => {
        if (!menuClick && layoutMode === "overlay") {
            setSidebarActive(false);
        }
        menuClick = false;
    }

    const onToggleMenu = (event) => {
        menuClick = true;

        setSidebarActive((prevState) => !prevState);

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items && layoutMode === "overlay") {
            setSidebarActive(false);
        }
    }

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const isSidebarVisible = () => {
        return sidebarActive;
    };

    const logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-active': sidebarActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false
    });

    const sidebarClassName = classNames('layout-sidebar', {
        'layout-sidebar-dark': layoutColorMode === 'dark',
        'layout-sidebar-light': layoutColorMode === 'light'
    });
    

    const userDetails = useAuthState();
    const isLoggedIn = Boolean(userDetails.token);
    console.log(userDetails)

        return (

            <div className={wrapperClass} onClick={onWrapperClick}>
            {isLoggedIn &&
            <div>
                <AppTopbar onToggleMenu={onToggleMenu} />

                <CSSTransition classNames="layout-sidebar" timeout={{ enter: 200, exit: 200 }} in={isSidebarVisible()} unmountOnExit>
                    <div ref={sidebar} className={sidebarClassName} onClick={onSidebarClick}>
                        <div className="layout-logo" style={{cursor: 'pointer'}} onClick={() => history.push('/')}>
                            <img alt="Logo" src={logo} />
                        </div>
                        <AppProfile />
                        <AppMenu model={Menu} onMenuItemClick={onMenuItemClick} />
                    </div>
                </CSSTransition>


                <div className="layout-main">

                     <Route path="/dashboard" exact component={EmptyPage} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/crud" component={Crud} />
                    <Route path="/empty" component={EmptyPage} />
                </div>
            </div>
            }
            {isLoggedIn==false &&
                <div className={wrapperClass} >
                    <div className="layout-login">
                        <Route path="/login" exact component={Login} />
                    </div>
                </div>
            }
            </div>
            
        );

}

export default App;
