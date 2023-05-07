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
      .then(async () => {
        await this.fetchUser();
        router.go(Routes.chat);
      })
      .catch(console.log);
  }

  async signin(data: SignInData) {
    store.set('auth.isLoading', true)
      await this.api.signin(data)
        .then((response: XMLHttpRequest) => {
          switch(response.status) {
            case 401:
              throw new Error('Неверный логин или пароль. Попробуйте ещё раз.')
            case 400:
              throw new Error('Пользователь уже в системе.')
            case 500:
              throw new Error('Внутренняя ошибка сервера. Попробуйте позже.')
          }
        }).then( async () => {
          await this.fetchUser();
          router.go(Routes.chat)
        }).catch(err => {
          console.error(err)
          store.set('auth.error', err.message);
        }).finally(() => {
          store.set('auth.isLoading', false)
        });
  }

  logout() {
    this.api.logout()
      .then(() => {
        router.go(Routes.signIn);
      })
      .catch(console.log);
  }

  async fetchUser() {
    store.set('user.isLoading', true)

    await this.api.getUser()
        .then((res: XMLHttpRequest) => {
          const user = res.response;
          store.set('user.data', user)
        }).catch(err => {
          store.set('user.error', err)
      }).finally(() => {
        store.set('user.isLoading', false)
      })
  }
}

export default new AuthController();


