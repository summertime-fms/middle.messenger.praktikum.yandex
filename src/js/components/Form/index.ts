import Label from '../Label';
import Button from '../Button';
import Block from '../../helpers/Block';
import template from './template.hbs';
import { validate } from '../../helpers/validation';
import Input from "../Input";

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

      this.children.labels.forEach((label: Label): void => {
        const input: Input = label.children.input;

        result[input.element.name] = input.element.value;
        validate(input, label);
      });

      console.log(result)

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
