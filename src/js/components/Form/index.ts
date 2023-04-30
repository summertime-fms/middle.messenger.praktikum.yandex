import Label from '../Label';
import Button from '../Button';
import Block from '../../helpers/Block';
import template from './template.hbs';
import {validateForm} from '../../helpers/validation';
import Input from "../Input";
import styles from './styles.module.pcss';

interface FormProps {
  labels: Array<Label> | Label;
  submitButton: Button,
  events: Record<string, (arg?: any) => any>,
  isValid?: boolean | null
}
export default class Form extends Block {
  private isValid: boolean | null;

  constructor(props: FormProps) {
    const externalSubmit = props.events?.submit;

    const internalSubmit = (evt: any) => {
      evt.preventDefault();
      this.isValid = validateForm(this.children.labels);

      if (externalSubmit && this.isValid) {
        externalSubmit();
      }
    };

    props.events.submit = internalSubmit;
    super(props);
  }

  init() {
    this.dispatchComponentDidMount()
  }

  componentDidMount() {
    const labels = this.children.labels;
    labels.forEach((label: Label) => {
      const input: Input = label.children.input;
      input.element.value = '';
      input.element.parentElement.classList.remove('active');
    });
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
