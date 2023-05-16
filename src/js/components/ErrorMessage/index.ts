import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
interface ErrorMessageProps {
  errorContent?: string;
}
export default class ErrorMessage extends Block {
  constructor(props: ErrorMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
