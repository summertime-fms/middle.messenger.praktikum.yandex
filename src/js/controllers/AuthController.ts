import {AuthAPI, SignUpData, SignInData} from "../api/Auth";
import {store} from "../helpers/Store";

class AuthController  {
  private api: AuthAPI;
  constructor() {
    this.api = new AuthAPI()

  }

  signup(data: SignUpData) {
    try {
      this.api.signup(data)
    } catch (err) {
      console.error(err)
    }
  }

  signin(data: SignInData) {
    try {
      this.api.signin(data)
    } catch (err) {
      console.error(err)
    }
  }

  logout() {
    try {
      this.api.logout()
    } catch (err) {
      console.error(err)
    }
  }

  fetchUser() {
    store.set('user.isLoading', true)

      this.api.getUser()
        .then((user) => {
          store.set('user.data', user)
        }).catch(err => {
          store.set('user.error', err)
      }).finally(() => {
        store.set('user.isLoading', false)
      })

  }
}

export default new AuthController();


