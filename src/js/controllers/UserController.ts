import {UserAPI, UserData} from "../api/User";
import {store} from "../helpers/Store";
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
}

export default new UserController();


