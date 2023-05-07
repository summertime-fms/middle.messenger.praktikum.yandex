import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import ErrorMessage from "../ErrorMessage";
import {log} from "util";

interface InputProps {
  text: string,
  type: string;
  // value: string;
  name: string;
  isRequired: boolean;
  events: Record<string, () => void>;
  error?: ErrorMessage,
  value?: string | number
  extraAttrs?: AttributesObject
}

type AttributesObject = Record<string, string>

export default class Input extends Block {
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
  }

  parseAttrsToString(attrsObject: AttributesObject) {
    return Object.entries(attrsObject).map(([name, value]) => {
      return `${name}="${value}"`
    }).join(' ');
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }

  componentDidMount() {
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {

  }

  get name() {
    return this.props.name
  }

  get inputElement() {
    return this.element.querySelector('input');
  }
}
