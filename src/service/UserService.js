import axios from 'axios';

export class UserService {

    getUsersMockData() {
        return axios.get('assets/demo/data/Users.json').then(res => res.data.data);
    }

    getUsers() {
        let token = localStorage.getItem("currentUser")
                    ? JSON.parse(localStorage.getItem("currentUser")).auth_token
                    : "";
        const headers =  {
            'Authorization': 'Bearer ' + token
        };
        return axios.get(`${window.ROOT_URL}/users`, { headers }).then(res => res.data.data);
    }
}