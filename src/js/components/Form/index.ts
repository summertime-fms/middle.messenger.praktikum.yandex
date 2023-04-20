import Label from '../Label';
import Button from '../Button';
import Block from '../../helpers/Block';
import template from './template.hbs';
import {validate, validateForm} from '../../helpers/validation';
import Input from "../Input";

interface FormProps {
  labels: Array<Label>;
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

    this.isValid = null;
  }

  render() {
    return this.compile(template, this.props);
  }

  getInputs() {
    return this.children.labels.map(label => label.children.input)
  }
}
