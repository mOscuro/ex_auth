
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import AuthClient from '@api_client/auth_client.js';
import { apicase } from '@apicase/core'
import { ApiService } from '@apicase/services'
import fetch from '@apicase/adapter-fetch'

const WOG_API_ROOT_URL = 'http://192.168.104.76:8085';
const authClient = new AuthClient();
const doRequest = apicase(fetch)

const ApiRoot = new ApiService({adapter: fetch, url: WOG_API_ROOT_URL }).on('error', err => console.error(err))

const WithAuthService = ApiRoot.extend({
    hooks: {
      /* Add client token */
      before ({ payload, next }) {
        // const token = localStorage.getItem('token')
        payload.headers = { 
          ...payload.headers, 
          'Authorization': `token ${authClient.getInstanceToken()}`
        }
        next(payload)
      }
    }
});

// AUTH related ----------------------------
export function authLogin({email, password}){
    return doRequest({
        url: `${WOG_API_ROOT_URL}/auth/login/`,
        method: 'POST',
        body: {
            email,
            password
        },
        hooks:{
            done ({ payload, result, retry, next }) {
                authClient.setToken(result.body.key);
                next(result);
            }
        }
    })
}

export function authRegister({firstName, lastName, email, password}){
    return doRequest({
        url: `${WOG_API_ROOT_URL}/auth/registration/`,
        method: 'POST',
        body: {firstName, lastName, email, password}
    })
}

export function authLogout(){
    return WithAuthService.doRequest({
        url: `auth/logout/`,
        method: 'POST',
        hooks:{
            done ({ payload, result, retry, next }) {
                authClient.removeToken();
                next(result);
            }
        }
    })
}

// WORKOUT related ----------------------------
export function workoutList(){
    return WithAuthService.doRequest({
        url: `workouts/`,
        method: 'GET'
    })
}

export function workoutRounds(workoutId){
    return WithAuthService.doRequest({
        url: `workouts/${workoutId}/rounds/`,
        method: 'GET',
    });
}

export function workoutCreate(name){
    return WithAuthService.doRequest({
        url: `workouts/`,
        method: 'POST',
        body: {name}
    });
}

export function workoutDelete(id){
    return WithAuthService.doRequest({
        url: `workouts/${id}/`,
        method: 'DELETE',
    });
}
