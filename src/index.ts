import router, {Routes} from './js/helpers/Router';
import {signInPage} from './js/pages/signIn';
import signUpPage from './js/pages/signUp';
import {ChatPage} from './js/pages/chat';
import AuthController from "./js/controllers/AuthController";
// const PAGES = {
//   signIn: signInPage,
//   signUp: signUpPage,
//   chat: ChatPage,
//   error: ErrorPage,
// };

window.addEventListener('DOMContentLoaded', async () => {
  router.use(Routes.signIn, signInPage)
        .use(Routes.signUp, signUpPage)
        .use(Routes.chat, ChatPage)
        .start();
});

let isProtectedRoute = true;

switch (window.location.pathname) {
  case Routes.signIn:
  case Routes.signUp:
    isProtectedRoute = false;
    break;
}

try {
  await AuthController.fetchUser();

  router.start();

  if (!isProtectedRoute) {
    router.go(Routes.signIn)
  }
} catch (e) {
  console.log(e)
  router.start();

}
