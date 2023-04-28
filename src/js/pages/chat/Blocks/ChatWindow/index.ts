import Block from '../../../../helpers/Block';
import template from './template.hbs';
import Message from '../../../../components/Message';
import styles from './styles.module.pcss';

interface ChatWindowProps {
  messages: Array<Message>
}

export default class ChatWindow extends Block {
  constructor(props: ChatWindowProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
