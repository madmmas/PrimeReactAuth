const Menu = {
    "ROOT": [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
                { label: 'Role', icon: 'pi pi-fw pi-user-edit', to: '/role' },
                { label: 'User', icon: 'pi pi-fw pi-calendar-plus', to: '/user' },
                { label: 'Empty', icon: 'pi pi-fw pi-home', to: '/empty' }
            ],
    "ADMIN": [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
                { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' }
            ],
    "USER": [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }
            ]
};

export default Menu;