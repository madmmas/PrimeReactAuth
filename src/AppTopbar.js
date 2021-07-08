import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthDispatch, logout, useAuthState } from './context';

export const AppTopbar = (props) => {
    const dispatch = useAuthDispatch();
	const userDetails = useAuthState();
    const history = useHistory();
    
    const handleLogout = () => {
		logout(dispatch);
		history.push('/login');
	};
    return (
        <div className="layout-topbar clearfix">
            <button type="button" className="p-link layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </button>
            <div className="layout-topbar-icons">
                <button  type="button" className="p-link">
                    <span className="layout-topbar-icon pi pi-sign-out" onClick={handleLogout}></span>
				</button>
            </div>
        </div>
    );
}
