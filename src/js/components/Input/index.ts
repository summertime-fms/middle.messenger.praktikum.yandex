import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

interface InputProps {
  type: string;
  // value: string;
  name: string;
  isRequired: boolean;
  events: Record<string, () => void>;
  error?: string,
  value?: string
}

export default class Input extends Block {
  constructor(props: InputProps) {
    const externalChange = props.events?.change;

    const internalInput = () => {
      if (['text', 'number', 'tel', 'email'].includes(this.props.name)) {
        this.setProps({
          value: this.element.value
        })
      }
    }
    const internalChange = () => {
      const parent: HTMLElement | null = this.element!.closest('div');
      if (!parent) return;

      this.element!.value === ''
        ? parent.removeAttribute('data-active')
        : parent.setAttribute('data-active', '');

      if (externalChange) {
        externalChange();
      }
    };

    props.events.change = internalChange;
    props.events.input = internalInput;

    super(props);
    this.dispatchComponentDidMount()
  }

  render() {
    // this.dispatchComponentDidMount();
    return this.compile(template, {...this.props, styles});
  }

  componentDidMount() {
    // this.element.value = '123';
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    // const oldPropsWithoutValue = delete {...oldProps}.value;
    // const newPropsWithoutValue = delete {...newProps}.value;

    // const isNeedRerender: boolean = oldPropsWithoutValue !== newPropsWithoutValue;
    const isNeedRerender: boolean = oldProps !== newProps;

    if (isNeedRerender) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    return isNeedRerender;
  }

  get name() {
    return this.props.name
  }
}
