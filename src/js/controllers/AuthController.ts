import {AuthAPI, SignUpData, SignInData} from "../api/Auth";
import {store} from "../helpers/Store";
import router, {Routes} from './../helpers/Router';
class AuthController  {
  private api: AuthAPI;
  constructor() {
    this.api = new AuthAPI()

  }

  signup(data: SignUpData) {
    this.api.signup(data)
      .then(() => {
        router.go(Routes.signIn);
      })
      .catch(console.log);
  }

  async signin(data: SignInData) {
    try {
      await this.api.signin(data);

      await this.fetchUser();
    } catch (err) {
      console.error(err)
    }
  }

  logout() {
    this.api.logout()
      .then(() => {
        router.go(Routes.signIn);
      })
      .catch(console.log);
  }

  fetchUser() {
    store.set('user.isLoading', true)

      this.api.getUser()
        .then((user) => {
          store.set('user.data', user)
          router.go(Routes.chat)
        }).catch(err => {
          store.set('user.error', err)
      }).finally(() => {
        store.set('user.isLoading', false)
      })

  }
}

export default new AuthController();


