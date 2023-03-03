import Block from '../../../../helpers/Block';
import template from './template.hbs';
import Form from '../../../../components/Form';

interface SettingsProps {
  title: string,
  isOpened: boolean,
  form: Form,
  activeClass?: string
}

export default class Settings extends Block {
  constructor(props: SettingsProps) {
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
