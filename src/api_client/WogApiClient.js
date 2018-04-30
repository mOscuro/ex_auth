
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import RestClient from 'ex_auth/src/api_client/rest_client.js';

const WOG_API_ROOT_URL = 'http://192.168.104.76:8085';

class ApiClient{

    async storeAuthToken(selectedValue){
        // Store authentication token in local storage of the device
        try{
            await AsyncStorage.setItem('token', selectedValue);
        }catch (error){
            console.error('[storeAuthToken] AsyncStorage error: ' + error.message);
        }
    }

    async retrieveAuthToken(){
        // Retrieve authentication token from local storage of the device
        // Can return null if not token was found!
        try{    
            const token = await AsyncStorage.getItem('token')
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
            const token = this.retrieveAuthToken().then((response)=>console.log(response));
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

export function authLogin(restClient, {email, password}){
    return restClient.request({
        url: `auth/login/`,
        method: RestClient.httpMethods.POST,
        withToken: false,
        body: {email, password}
    });
}

export function authRegister(restClient, {firstName, lastName, email, password}){
    return restClient.request({
        url: `auth/registration/`,
        method: RestClient.httpMethods.POST,
        withToken: false,
        body: {firstName, lastName, email, password}
    });
}

export function authLogout(restClient){
    return restClient.request({
        url: `auth/logout/`,
        method: RestClient.httpMethods.POST,
        withToken: true,
    });
}

export function workoutList(restClient){
    return restClient.request({
        url: `workouts/`,
        method: RestClient.httpMethods.GET,
        withToken: true,
    });
}
