import {UserAPI, UserData} from "../api/User";
import {store} from "../helpers/Store";

interface searchUsersReq {
  login: string
}
class UserController  {
  private api: UserAPI;
  constructor() {
    this.api = new UserAPI()

  }

  async update(data: UserData) {
    return await this.api.updateData(data)
  }

  uploadAvatar(data: FormData) {
    this.api.setUserAvatar(data)
      .then((res: XMLHttpRequest) => {
        const avatarPath = `https://ya-praktikum.tech/api/v2/resources/${res.response.avatar}`;
        store.set('user.avatar.pathname', avatarPath)
      }).catch((err: Error) => {
      console.error(err)
    })
  }
  updateUserPassword(data: Record<string, string>) {
    this.api.updatePassword(data)
      .then((res: XMLHttpRequest) => {
        switch(res.response.status) {
          case 401:
            throw new Error('Неверный старый пароль. Попробуйте ещё раз.')
          case 400:
            throw new Error('Ошибка клиента. Неверный запрос.')
          case 500:
            throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
        }
      }).catch((err: Error) => {
        store.set('user.passwordError', err);
    })
  }

  searchUsers(data: searchUsersReq) {
    this.api.getUsers(data)
      .then(({response}) => {
        if (response.status >= 400) {
          throw new Error('Ошибка. Попробуйте ещё раз позже')
        }

        if (response.length === 0) {
          store.set('user.search.result', 'Ничего не нашлось :(');
          return;
        }

        store.set('user.search.result', response);
      }).catch((err: Error) => {
        store.set('user.search.error', err)
    })
  }
}

export default new UserController();


