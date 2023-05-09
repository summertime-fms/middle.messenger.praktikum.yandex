import BaseAPI from './BaseAPI';

// export interface SignUpData {
//   first_name: string,
//   second_name: string,
//   login: string,
//   email: string,
//   password: string,
//   phone: string
// }
//
// export interface SignInData {
//   login: string,
//   password: string
// }

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

export interface UserData {
  first_name: 'string',
  second_name: 'string',
  display_name: 'string',
  login: 'string',
  email: 'string',
  phone: 'string'
}

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateData(data: UserData) {
    return this.http.put('/profile', {
      data,
      headers: {
        'Content-type': 'application/json'
      }
    });
  }

  setUserAvatar(data: FormData) {
    return this.http.put('/profile/avatar', {
      data,
    });
  }

  updatePassword(data: Record<string, any>) {
    return this.http.put('/password', {
      data,
      headers: {
        'Content-type': 'application/json'
      }
    })
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}
