import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import ErrorMessage from "../ErrorMessage";

interface InputProps {
  text?: string,
  type: string;
  // value: string;
  name: string;
  isRequired: boolean;
  events: Record<string, () => void>;
  error?: ErrorMessage,
  value?: string | number
  extraAttrs?: AttributesObject
  classes?: string[],
  noValidate?: boolean
}

type AttributesObject = Record<string, string>

export default class Input extends Block {
  classesStr: string;
  constructor(props: InputProps) {
    const externalChange = props.events?.change;

    const internalInput = () => {
      if (['text', 'number', 'tel', 'email', 'password'].includes(this.props.type)) {
        this.setProps({
          value: this.inputElement.value
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

  init() {
    if (this.props.extraAttrs && Object.values(this.props.extraAttrs).length) {
      const stringifiedAttrs = this.parseAttrsToString(this.props.extraAttrs);
      this.setProps({
        extraAttrs: stringifiedAttrs
      })
    }

    if (this.props.classes) {
      this.props.classes = this.props.classes.join(' ');
    }

    this.props.isRequired = this.props.isRequired ? 'required' : '';
  }

  parseAttrsToString(attrsObject: AttributesObject) {
    return Object.entries(attrsObject).map(([name, value]) => {
      return `${name}="${value}"`
    }).join(' ');
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
  componentDidUpdate(): boolean {
    return false;
  }

  get name() {
    return this.props.name
  }

  get inputElement() {
    return this.element.querySelector('input');
  }
}
