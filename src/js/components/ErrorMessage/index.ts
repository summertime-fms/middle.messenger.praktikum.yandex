import Block from '../../helpers/Block';
import template from './template.hbs';

interface ErrorMessageProps {
  errorContent?: string;
}
export default class ErrorMessage extends Block {
  constructor(props: ErrorMessageProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
