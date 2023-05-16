import BaseAPI from './BaseAPI';

export interface SignUpData {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export interface SignInData {
  login: string,
  password: string
}

export interface User {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: number,
  avatar: string

}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignUpData) {
    return this.http.post('/signup', {
      data,
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  signin(data: SignInData) {
    return this.http.post('/signin', {
      data,
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  logout() {
    return this.http.post('/logout', {
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  getUser() {
    return this.http.get('/user', {
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}
