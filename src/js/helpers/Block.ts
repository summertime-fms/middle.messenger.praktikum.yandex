class Block {
  static readonly EVENTS: Record<string, string> = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private readonly _meta: {tagName: string, props: any};
  protected props: any;
  constructor(tagName: string = "div", props: any = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
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
    const response = this.componentDidUpdate(oldProps, newProps);
  }

// Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const isNeedRerender: boolean = oldProps === newProps ? false : true;
    if (isNeedRerender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
    return isNeedRerender;
  }

  setProps = nextProps => {
    if (!nextProps) {
      return;
    }
    const prevProps: any = this.props;
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, prevProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const fragment: any = this.render(); //временно any
   // templator here
    this._element!.innerHTML = '';
    this._element!.append(fragment)
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props): Object {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    props = new Proxy(props, {
      get(props, prop) {
        const value = props[prop];

        if (value && value.toString().startsWith('_')) {
          throw new Error('Нет прав')
        }

        return value
      },
      set(props, prop, value) {
        const localProp = props[prop];
        if (localProp && localProp.toString().startsWith('_')) {
          throw new Error('Нет прав')
        }

        props[prop] = value;
        return true
      },
      deleteProperty(props, prop) {
        throw new Error('Нет прав');
      },
    })
    return props;
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this._element!.style.display = 'block';
  }

  hide() {
    this._element!.style.display = 'none';

  }
}
