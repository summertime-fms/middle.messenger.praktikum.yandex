import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

export interface DialogProps {
  id: number;
  name: string;
  preview: string;
  totalNewMessages: number;
  time: string;
  isRead: boolean;
  events: Record<string, (evt:any) => void>;
  classes?: string
}

export default class Dialog extends Block {
  constructor(props: DialogProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
