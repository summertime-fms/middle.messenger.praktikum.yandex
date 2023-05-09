import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

export interface ButtonProps {
  text?: string;
  type: string;
  events: Record<string, (evt:any) => void>;
  classes?: string,
  action?: string,
  icon?: {
    width: number,
    height: number,
    hash: string
  }
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }


  render() {
    return this.compile(template, {...this.props, styles});
  }
}
