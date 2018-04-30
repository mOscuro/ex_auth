/* Authentication client module */

import {AsyncStorage} from 'react-native';

const TOKEN_KEY = 'token';

class AuthClient {
  constructor() {
    this.getToken = this.getToken.bind(this);
    this.getInstanceToken = this.getInstanceToken.bind(this);

    AsyncStorage.getItem(TOKEN_KEY).then((token) => {
      this.token = token;
    });
  }

  getInstanceToken() {
    return this.token;
  }

  async getToken() {
    try {
        var token = await AsyncStorage.getItem(TOKEN_KEY)
        return token.json();
    } catch (err) {
      return err;
    }
  }

  async setToken(token) {
    this.token = token;
    await AsyncStorage.setItem(TOKEN_KEY, token);
  }

  removeToken() {
    this.token = null;
    AsyncStorage.removeItem(TOKEN_KEY).then(() => {});
  }
}

export default AuthClient;
