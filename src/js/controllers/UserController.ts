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

  async setAvatar(data: FormData) {
    return await this.api.setUserAvatar(data)
  }

  // async fetchUser() {
  //   store.set('user.isLoading', true)
  //
  //   await this.api.getUser()
  //     .then((res: XMLHttpRequest) => {
  //       const user = res.response;
  //       store.set('user.data', user)
  //     }).catch(err => {
  //       store.set('user.error', err)
  //     }).finally(() => {
  //       store.set('user.isLoading', false)
  //     })
  // }
}

export default new UserController();


