import Router from './js/helpers/Router';
import signInPage from './js/pages/signIn';
import signUpPage from './js/pages/signUp';
import ChatPage from './js/pages/chat';
import ErrorPage from './js/pages/Error';

enum Routes {
  signIn= '/',
  signUp = '/sign-up',
  chat = '/chat',
  settings = '/settings',
  error = '/error'
}

const PAGES = {
  signIn: signInPage,
  signUp: signUpPage,
  chat: ChatPage,
  error: ErrorPage,
};

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.signIn, PAGES.signIn)
        .use(Routes.signUp, PAGES.signUp)
        .start();
  Router.go(Routes.signIn);
});
