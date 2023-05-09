import {UserAPI, UserData} from "../api/User";
import {store} from "../helpers/Store";

interface PasswordData {
  oldPassword: string,
  newPassword: string
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
  updateUserPassword(data: PasswordData) {
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
}

export default new UserController();


