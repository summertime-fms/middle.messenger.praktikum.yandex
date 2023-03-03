import signInPage from '../pages/signIn';
import signUpPage from '../pages/signUp';
import ChatPage from '../pages/chat';
import ErrorPage from '../pages/Error';

const ROUTES = {
  signIn: signInPage,
  signUp: signUpPage,
  chat: ChatPage,
  error: ErrorPage,
};

export const renderDom = (route: keyof typeof ROUTES): void => {
  const app: HTMLElement | null = document.querySelector('#app');

  app!.innerHTML = '';

  const PageComponent = ROUTES[route];
  const page = new PageComponent({});

  app!.append(page.element);
  page.dispatchComponentDidMount();
};
