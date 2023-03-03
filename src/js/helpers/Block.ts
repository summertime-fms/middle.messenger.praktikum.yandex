import { nanoid } from 'nanoid';
import EventBus from './EventBus';

export default class Block {
  static readonly EVENTS: Record<string, string> = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id: string;

  protected eventBus: () => EventBus;

  private _element: any = null;

  protected props: any;

  private events: Record<string, () => void>;

  public children: Record<string, any>;

  constructor(childrenAndProps: any = {}) {
    const eventBus = new EventBus();
    const { children, props } = this._getChildrenAndProps(childrenAndProps);
    this.children = children;
    this.props = this._makePropsProxy(props);
    this.events = this.props.events;
    this.id = nanoid(6);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {

  }

  _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  get setProps() {
    return this._setProps;
  }

  _getChildrenAndProps(childrenAndProps: any) {
    const props: Record<string, any> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((val) => val instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return {
      props, children,
    };
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    this.componentDidUpdate(oldProps, newProps);
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const isNeedRerender: boolean = oldProps !== newProps;
    if (isNeedRerender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return isNeedRerender;
  }

  _setProps(nextProps: Object) {
    if (!nextProps) {
      return;
    }
    const prevProps: any = this.props;
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
  }

  get element() {
    return this._element;
  }

  _addEvents() {
    if (!this.events) return;

    Object.keys(this.events).forEach((event) => {
      this.element!.addEventListener(event, this.events[event]);
    });
  }

  private _render() {
    const fragment: any = this.render(); // временно any
    const el = fragment.firstElementChild;

    if (this._element) {
      this._element.replaceWith(el);
    }

    this._element = el;
    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element;
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`).join('');
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');
    temp.innerHTML = html;

    const compileComponent = (component: any) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };
    /* eslint-disable */
    Object.entries(this.children).forEach(([_, component]) => {
      /* eslint-enable */
      if (Array.isArray(component)) {
        component.forEach((el) => compileComponent(el));
        return;
      }

      compileComponent(component);
    });

    return temp.content;
  }

  _makePropsProxy(props: Object): Object {
    props = new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop as keyof Object];

        if (value && value.toString().startsWith('_')) {
          throw new Error('Нет прав');
        }

        return value;
      },
      set(target, prop, value) {
        const localProp = target[prop as keyof Object];
        if (localProp && localProp.toString().startsWith('_')) {
          throw new Error('Нет прав');
        }

        target[prop as keyof Object] = value;
        return true;
      },
      deleteProperty() {
        throw new Error('Нет прав');
      },
    });
    return props;
  }

  _compile() {

  }

  _show() {
    this._element.style.display = 'grid';
  }

  _hide() {
    this._element.style.display = 'none';
  }
}
