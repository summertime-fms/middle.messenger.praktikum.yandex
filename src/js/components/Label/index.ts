import Input from '../Input';
import ErrorMessage from '../ErrorMessage';
import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

interface LabelProps {
  label: string;
  input: Input,
  error: ErrorMessage,
}
export default class Label extends Block {
  constructor(props: LabelProps) {
    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
