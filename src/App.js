import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppProfile } from './AppProfile';
import { AppConfig } from './AppConfig';

// import { Dashboard } from './components/Dashboard';
// import { ButtonDemo } from './components/ButtonDemo';
// import { ChartDemo } from './components/ChartDemo';
// import { Documentation } from './components/Documentation';
// import { FileDemo } from './components/FileDemo';
// import { FloatLabelDemo } from './components/FloatLabelDemo';
// import { FormLayoutDemo } from './components/FormLayoutDemo';
// import { InputDemo } from './components/InputDemo';
// import { ListDemo } from './components/ListDemo';
// import { MenuDemo } from './components/MenuDemo';
// import { MessagesDemo } from './components/MessagesDemo';
// import { MiscDemo } from './components/MiscDemo';
// import { OverlayDemo } from './components/OverlayDemo';
// import { PanelDemo } from './components/PanelDemo';
// import { TableDemo } from './components/TableDemo';
// import { TreeDemo } from './components/TreeDemo';
// import { InvalidStateDemo } from './components/InvalidStateDemo';

import { Calendar } from './pages/Calendar';
import { Crud } from './pages/Crud';
import { EmptyPage } from './pages/EmptyPage';

// import { DisplayDemo } from './utilities/DisplayDemo';
// import { ElevationDemo } from './utilities/ElevationDemo';
// import { FlexBoxDemo } from './utilities/FlexBoxDemo';
// import { GridDemo } from './utilities/GridDemo';
// import { IconsDemo } from './utilities/IconsDemo';
// import { SpacingDemo } from './utilities/SpacingDemo';
// import { TextDemo } from './utilities/TextDemo';
// import { TypographyDemo } from './utilities/TypographyDemo';
// import { TimelineDemo } from './utilities/TimelineDemo';

import { Login } from './pages/Login';

import PrimeReact from 'primereact/api';

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

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

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
    const isLoggedIn = true;
    if (isLoggedIn) {
        return (

            <div className={wrapperClass} onClick={onWrapperClick}>
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

                {/* <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                    layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} /> */}

                <div className="layout-main">
                    {
                     <Route path="/dashboard" exact component={EmptyPage} />
                    /*<Route path="/formlayout" component={FormLayoutDemo} />
                    <Route path="/input" component={InputDemo} />
                    <Route path="/floatlabel" component={FloatLabelDemo} />
                    <Route path="/invalidstate" component={InvalidStateDemo} />
                    <Route path="/button" component={ButtonDemo} />
                    <Route path="/table" component={TableDemo} />
                    <Route path="/list" component={ListDemo} />
                    <Route path="/tree" component={TreeDemo} />
                    <Route path="/panel" component={PanelDemo} />
                    <Route path="/overlay" component={OverlayDemo} />
                    <Route path="/menu" component={MenuDemo} />
                    <Route path="/messages" component={MessagesDemo} />
                    <Route path="/file" component={FileDemo} />
                    <Route path="/chart" component={ChartDemo} />
                    <Route path="/misc" component={MiscDemo} />
                    <Route path="/display" component={DisplayDemo} />
                    <Route path="/elevation" component={ElevationDemo} />
                    <Route path="/flexbox" component={FlexBoxDemo} />
                    <Route path="/icons" component={IconsDemo} />
                    <Route path="/grid" component={GridDemo} />
                    <Route path="/spacing" component={SpacingDemo} />
                    <Route path="/typography" component={TypographyDemo} />
                    <Route path="/text" component={TextDemo} /> */}
                    <Route path="/calendar" component={Calendar} />
                    {/* <Route path="/timeline" component={TimelineDemo} /> */}
                    <Route path="/crud" component={Crud} />
                    <Route path="/empty" component={EmptyPage} />
                    {/* <Route path="/documentation" component={Documentation} /> */}
                </div>

                {/* <AppFooter /> */}

            </div>
        );
    }else{
        return(
            <div className={wrapperClass} >
                <div className="layout-login">
                    <Route path="/" exact component={Login} />
                </div>
            </div>
        )
    }

}

export default App;
