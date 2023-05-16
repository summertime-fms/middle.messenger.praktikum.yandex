import Button from '../Button';
import Block from '../../helpers/Block';
import template from './template.hbs';
import {validateForm} from '../../helpers/validation';
import Input from "../Input";
import styles from './styles.module.pcss';

interface FormProps {
  inputs: Array<Input> | Input;
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
      this.isValid = validateForm(this.inputsToValidate);

      if (externalSubmit && this.isValid) {
        externalSubmit();
      }
    };

    props.events.submit = internalSubmit;
    super(props);
  }

  get inputsToValidate() {
    return this.children.inputs.filter((input: Input) => !input.props.noValidate);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}
