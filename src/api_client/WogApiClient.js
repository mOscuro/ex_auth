
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const WOG_API_ROOT_URL = 'http://192.168.104.76:8085';

class ApiClient{

    async storeAuthToken(selectedValue){
        // Store authentication token in local storage of the device
        try{
            await AsyncStorage.setItem('auth_token', selectedValue);
        }catch (error){
            console.error('[storeAuthToken] AsyncStorage error: ' + error.message);
        }
    }

    async retrieveAuthToken(){
        // Retrieve authentication token from local storage of the device
        // Can return null if not token was found!
        try{    
            const token = await AsyncStorage.getItem('auth_token');
            return token
        }catch (error){
            console.error('[retrieveAuthToken] AsyncStorage error: ' + error.message);
        }
    }

    api_request(method, url, params={}, data={}, headers = null, authenticated=true){
        if (headers === null) {
            headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }
        if (authenticated) {
            const token = this.retrieveAuthToken();
            headers = {...headers, 'Authorization': `Token ${token}`}
        }
        axios({url:url, method:method, headers:headers, params:params, data:data})
        .then(function(response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return null;
        });

    }
}

const client = new ApiClient();

export function auth_login(email, password){
    const URL = `${WOG_API_ROOT_URL}/auth/login/`;
    const DATA = { email, password }
    return client.api_request('post', URL, params={}, data=DATA, headers = null, authenticated=false);;
}

export function auth_register(firstName, lastName, email, password){
    const URL = `${WOG_API_ROOT_URL}/auth/registration/`;
    const DATA = {
        email,
        first_name: firstName,
        last_name: lastName,
        password1: password,
        password2: password,
    }
    return client.api_request('post', URL, data=DATA, authenticated=false);
}

export function auth_logout(){
    const URL = `${WOG_API_ROOT_URL}/auth/logout/`;
    return client.api_request('post', URL, data=DATA, authenticated=true);
}

export function workout_list(){
    const URL = `${WOG_API_ROOT_URL}/workouts/`;
    return client.api_request('get', URL, data=DATA, authenticated=true);
}
