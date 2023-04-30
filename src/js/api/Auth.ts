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
    return this.http.post('/signup', data);
  }

  signin(data: SignInData) {
    return this.http.post('/signin', data);
  }

  logout() {
    return this.http.post('/logout');
  }

  getUser() {
    return this.http.get('/user');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}
