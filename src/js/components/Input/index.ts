import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

interface InputProps {
  type: string;
  name: string;
  isRequired: boolean;
  events: Record<string, () => void>;
  error?: string
}

export default class Input extends Block {
  constructor(props: InputProps) {
    const externalChange = props.events?.change;

    const internalChange = () => {
      const parent: HTMLElement | null = this.element!.closest('div');
      if (!parent) return;

      this.element!.value === ''
        ? parent.removeAttribute('data-active')
        : parent.setAttribute('data-active', '');

      if (externalChange) {
        externalChange();
      }
    };

    props.events.change = internalChange;

    super(props);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
