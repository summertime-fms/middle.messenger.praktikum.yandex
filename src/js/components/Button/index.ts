import Block from '../../helpers/Block';
import baseTemplate from './templates/base_template.hbs';
import closeTemplate from './templates/close_template.hbs';
import styles from './styles.module.pcss';

export interface ButtonProps {
  text?: string;
  type: string;
  events: Record<string, (evt:any) => void>;
  classes?: string,
  action?: string
}

export default class Button extends Block {
  private template: typeof baseTemplate;
  constructor(props: ButtonProps) {
    super(props);
  }

  init() {
    const action: string | undefined = this.props.action;

    switch (action) {
      case 'close':
        this.template = closeTemplate;
        break;

      default: {
        this.template = baseTemplate;
      }
    }
  }

  render() {
    console.log(this.template)
    return this.compile(this.template, {...this.props, styles});
  }
}
