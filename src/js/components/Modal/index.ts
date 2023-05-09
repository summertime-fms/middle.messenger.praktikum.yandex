import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import {getChangedProps} from "../../helpers/utils";
import Button from "../Button";
import {customAlphabet} from "nanoid";
export interface ModalProps {
  innerComponent: typeof Block;
  contentTemplate: typeof template;
  isOpened: boolean
}

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super(props);
  }

  init() {
    this.children.content = new this.props.innerComponent();
    this.children.closeButton = new Button({
      action: 'close',
      type: 'button',
      events: {
        click: () => {
          this.setProps({
            isOpened: false
          })
        }
      }
    })
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    const changedProps = getChangedProps(oldProps, newProps);
    if (changedProps.includes('isOpened')) {
      this.element.classList.toggle(`${styles['is-active']}`);
    }
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

