import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import Dialog from '../../../../components/Dialog';
import Search from '../Search';

interface ChatsListProps {
  dialogs: Dialog[]
}

export default class ChatsList extends Block {
  constructor(props: ChatsListProps) {
    super(props);
  }

  init() {
    this.children.search = new Search({

    })
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
