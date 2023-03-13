import Block from '../../helpers/Block';
import template from './template.hbs';

export interface MessageProps {
  text: string;
  time: string;
  sender: string
}
export default class Message extends Block {
  constructor(props: MessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
