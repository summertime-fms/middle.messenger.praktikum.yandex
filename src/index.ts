import router, {Routes} from './js/helpers/Router';
import {signInPage} from './js/pages/signIn';
import signUpPage from './js/pages/signUp';
import {Chat} from './js/pages/chat';
import ErrorPage from './js/pages/Error';


const PAGES = {
  signIn: signInPage,
  signUp: signUpPage,
  chat: Chat,
  error: ErrorPage,
};

window.addEventListener('DOMContentLoaded', async () => {
  router.use(Routes.signIn, PAGES.signIn)
        .use(Routes.signUp, PAGES.signUp)
        .use(Routes.chat, PAGES.chat)
        .start();
});
