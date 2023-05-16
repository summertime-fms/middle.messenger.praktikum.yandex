import Block from '../helpers/Block';
import Router from '../helpers/Router';

export default function withRouter(Component: typeof Block) {
  type Props = typeof Component;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router: Router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof Router;
}
