import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import Dialog from "../../../../components/Dialog";

interface ChatsListProps {
  dialogs: Dialog[]
}

export default class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
