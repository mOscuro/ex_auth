
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import AuthClient from '@api_client/auth_client.js';
import { apicase } from '@apicase/core'
import { ApiService } from '@apicase/services'
import fetch from '@apicase/adapter-fetch'

const WOG_API_ROOT_URL = 'http://192.168.1.33:8085';
const authClient = new AuthClient();
const doRequest = apicase(fetch)

// const ApiRoot = new ApiService(fetch, { url: 'http://192.168.1.33:8085' }).on('error', err => console.error(err))

export function authLogin({email, password}){
    // const loginService = ApiRoot.extend({ url: 'auth/login/' })
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
    return doRequest({
        url: `${WOG_API_ROOT_URL}/auth/logout/`,
        method: 'POST',
        headers: {'Authorization': `token ${authClient.getInstanceToken()}`},
        hooks:{
            done ({ payload, result, retry, next }) {
                authClient.removeToken();
                next(result);
            }
        }
    })
}

export function workoutList(){
    return doRequest({
        url: `${WOG_API_ROOT_URL}/workouts/`,
        method: 'GET',
        headers: {'Authorization': `token ${authClient.getInstanceToken()}`},
    })
}

export function workoutRounds(workoutId){
    return doRequest({
        url: `${WOG_API_ROOT_URL}/workouts/${workoutId}/rounds/`,
        method: 'GET',
        headers: {'Authorization': `token ${authClient.getInstanceToken()}`},
    });
}

export function workoutCreate(name){
    return doRequest({
        url: `${WOG_API_ROOT_URL}/workouts/`,
        method: 'POST',
        headers: {'Authorization': `token ${authClient.getInstanceToken()}`},
        body: {name}
    });
}

export function workoutDelete(id){
    return doRequest({
        url: `${WOG_API_ROOT_URL}/workouts/${id}/`,
        method: 'DELETE',
        headers: {'Authorization': `token ${authClient.getInstanceToken()}`},
    });
}
