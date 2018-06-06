
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import RestClient from '@api_client/rest_client.js';
import AuthClient from '@api_client/auth_client.js';

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

const authClient = new AuthClient();
const restClient = new RestClient({
    apiOrigin: 'http://192.168.104.76:8085',
    getToken: authClient.getInstanceToken,
  });

import { apicase } from '@apicase/core'
import { ApiService } from '@apicase/services'
import fetch from '@apicase/adapter-fetch'

const doRequest = apicase(fetch)

const ApiRoot = new ApiService(fetch, { url: 'http://192.168.104.76:8085' }).on('error', err => console.error(err))

const WithAuthService = ApiRoot.extend({
    hooks: {
      /* Add client token */
      before ({ payload, next }) {
          console.log('========');
          console.log(payload);
        next(payload)
      },
    }
});

export function authLogin({email, password}){
    const loginService = ApiRoot.extend({ url: 'auth/login/' })
    return loginService.doRequest({
        method: 'POST',
        body: {
            email,
            password
        }
    })
}

export function authRegister({firstName, lastName, email, password}){
    return restClient.request({
        url: `auth/registration/`,
        method: RestClient.httpMethods.POST,
        withToken: false,
        body: {firstName, lastName, email, password}
    });
}

export function authLogout(){
    return restClient.request({
        url: `auth/logout/`,
        method: RestClient.httpMethods.POST,
        withToken: true,
    });
}

export function workoutList(){
    return doRequest({
        url: 'http://192.168.104.76:8085/workouts/',
        method: 'GET',
        headers: {'Authorization': `token ${authClient.token}`},
    })
}

export function workoutRounds(workoutId){
    return restClient.request({
        url: `workouts/${workoutId}/rounds/`,
        method: RestClient.httpMethods.GET,
        withToken: true,
    });
}

export function workoutCreate(name){
    return restClient.request({
        url: `workouts/`,
        method: RestClient.httpMethods.POST,
        withToken: true,
        body: {name}
    });
}

export function workoutDelete(id){
    return restClient.request({
        url: `workouts/${id}/`,
        method: RestClient.httpMethods.DELETE,
        withToken: true,
    });
}
