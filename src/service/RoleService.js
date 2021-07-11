import axios from 'axios';

export class RoleService {
    
    getRolesMockData() {
        return axios.get('assets/demo/data/Roles.json').then(res => res.data.data);
    }
    async getRoles() {
        let token = localStorage.getItem("currentUser")
                    ? JSON.parse(localStorage.getItem("currentUser")).auth_token
                    : "";
        const headers =  {
            'Authorization': 'Bearer ' + token
        };
        return axios.get(`${window.ROOT_URL}/roles`, { headers }).then(res => res.data.data);
    }
}