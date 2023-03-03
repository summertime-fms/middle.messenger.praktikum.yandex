import Label from '../Label';
import Button from '../Button';
import Block from '../../helpers/Block';
import template from './template.hbs';
import { validate } from '../../helpers/validation';

interface FormProps {
  labels: Array<Label>;
  submitButton: Button,
  events: Record<string, (arg?: any) => any>;
}
export default class Form extends Block {
  constructor(props: FormProps) {
    const externalSubmit = props.events?.submit;

    const internalSubmit = (evt: any) => {
      evt.preventDefault();
      const result: Record<string, any> = {};
      const form: any = this.element;
      const inputs: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');

      inputs.forEach((input) => {
        result[input.name] = input.value;
      });

      this.children.labels.forEach((label: Label): void => {
        validate(label.children.input.element, label);
      });
      if (externalSubmit) {
        externalSubmit();
      }
    };

    props.events.submit = internalSubmit;
    super(props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
