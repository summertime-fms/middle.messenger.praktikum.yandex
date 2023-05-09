import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import {withStore} from "../../../../helpers/Store";
import UserController from "../../../../controllers/UserController";
import Button from "../../../../components/Button";
import Form from "../../../../components/Form";
import Input from "../../../../components/Input";
import ErrorMessage from "../../../../components/ErrorMessage";
interface SettingsProps {
  isOpened: boolean,
  activeClass?: string,
}

export default class PasswordSettingsBase extends Block {
  constructor(props: SettingsProps) {
    super(props);
  }

  init() {
    this.children.form = new Form({
      submitButton: new Button({
        text: 'Save',
        type: 'submit',
        events: {}
      }),
      inputs: [
        new Input({
          text: 'Current password',
          error: new ErrorMessage({}),
          type: 'password',
          value: '',
          name: 'oldPassword',
          isRequired: true,
          events: {},
        }),
        new Input({
          text: 'New password',
          error: new ErrorMessage({}),
          type: 'password',
          value: '',
          name: 'newPassword',
          isRequired: true,
          events: {},
        }),
        new Input({
          text: 'Repeat new password',
          error: new ErrorMessage({}),
          type: 'password',
          value: '',
          name: 'repeat_password',
          isRequired: true,
          events: {},
        })
      ],
      events: {
        submit: () => {
          const data = this.getValues();
          UserController.updateUserPassword(data);
        }
      }
    });
  }

  getValues() {
    const neededInputs = this.inputs.filter((input: Input) => ['oldPassword', 'newPassword'].includes(input.props.name));

    const values = neededInputs.map((input: Input): string[] => {
      const {name, value} = input.props;
      return [name, value];
    });

    return Object.fromEntries(values);
  }

  get inputs() {
    return this.children.form.children.inputs;
  }

  componentDidUpdate(): boolean {
    return true;
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUser = withStore((state) => ({...state.user}));
const PasswordSettings = withUser(PasswordSettingsBase);
export {PasswordSettings};
