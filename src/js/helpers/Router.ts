import Block from './Block';
import {isEqual} from './utils';

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

type RouteProps = {
  rootQuery: string
}

class Route {
  private _pathname: string;
  private readonly _blockClass: Block;
  private _block: Block | null;
  private _props: RouteProps
  constructor(pathname: string, view: Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block._hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      console.log(this._props.rootQuery)
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block._show();
  }
}

class Router  {
  private readonly __instance: Router;
  private history: History;
  _currentRoute: Route | null;
  _rootQuery: string;
  private routes: Route[];
  constructor(rootQuery: string) {
    if (this.__instance) {
      return this.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    this.__instance = this;
  }

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes.push(route);
    return this;
  }

  start() {
    window.addEventListener('popstate', (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    window.history.back();
  }

  forward() {
    window.history.forward();
  }

  getRoute(pathname: string) {
    const result = this.routes.find(route => route.match(pathname));
    if (!result) {
      throw new Error(`No such root - ${pathname}`);
    }
    return result;
  }
}

export const RouterInstance = new Router('#app')

