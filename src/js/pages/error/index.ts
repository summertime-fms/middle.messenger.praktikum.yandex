import Block from '../../helpers/Block';
import template from './template.hbs';

interface ErrorPageProps {
  errorMessage: string
}
export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  init() {
    this.props.errorMessage = 'error message will be here';
  }

  componentDidMount() {
  }

  render() {
    return this.compile(template, this.props);
  }
}
