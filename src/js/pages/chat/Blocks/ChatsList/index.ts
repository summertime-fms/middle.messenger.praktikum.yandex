import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

console.log(styles.chatsName)
interface ChatPreviewProps {
  id: number,
  name: string,
  messagePreview: string,
  time: string,
  totalNewMessages: number,
  isRead: boolean
}

interface ChatsListProps {
  chats: Array<ChatPreviewProps>
}

export default class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
