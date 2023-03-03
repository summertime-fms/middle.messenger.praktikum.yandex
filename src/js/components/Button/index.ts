import Block from '../../helpers/Block';
import template from './template.hbs';

export interface ButtonProps {
  text: string;
  type: string;
  events: Record<string, (evt:any) => void>;
  classes: string
}

export default class Button extends Block {
  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
