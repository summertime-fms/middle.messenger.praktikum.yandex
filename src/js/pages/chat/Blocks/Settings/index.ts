import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import {withStore} from "../../../../helpers/Store";
import UserController from "../../../../controllers/UserController";
import Button from "../../../../components/Button";
import Form from "../../../../components/Form";
import Input from "../../../../components/Input";
import ErrorMessage from "../../../../components/ErrorMessage";
import {User} from "../../../../api/User";
import {UploadAvatar} from "../../../../components/AvatarUpload";
interface SettingsProps {
  title: string,
  isOpened: boolean,
  activeClass?: string,
  userData: User | null,
}

export default class SettingsBase extends Block {
  private inputs: Input[];
  private userData: User | null;
  constructor(props: SettingsProps) {
    super(props);
    this.userData = null;
  }

  init() {
    this.userData = this.props.data;

    this.inputs = this.createInputs(this.userData!);

    this.children.form = new Form({
      submitButton: new Button({
        text: 'Save',
        type: 'submit',
        events: {}
      }),

      inputs: this.inputs,
      events: {
        submit() {
          const data = this.getUserData();
          UserController.update(data)
            .then((response: XMLHttpRequest) => {
              console.log(response)
            })
        }
      }
    });
    this.children.uploadAvatar = new UploadAvatar({});
  }

  getUserData() {
    const values = this.inputs.map((input: Input): string[] => {
      const {name, value} = input.props;
      return [name, value];
    });

    return Object.fromEntries(values);
  }

  createInputs(data: User) {
    const displayName = new Input({
      text: 'Display Name',
      error: new ErrorMessage({}),
      type: 'text',
      value: data['display_name'],
      name: 'display_name',
      isRequired: true,
      events: {

      },
    });

    const firstName = new Input({
      text: 'First Name',
      error: new ErrorMessage({}),
      type: 'text',
      value: data['first_name'],
      name: 'first_name',
      isRequired: true,
      events: {
      },
    });

    const secondName = new Input({
      text: 'Second Name',
      error: new ErrorMessage({}),
      type: 'text',
      value: data['second_name'],
      name: 'second_name',
      isRequired: true,
      events: {

      },
    });

    const email = new Input({
      text: 'Email',
      error: new ErrorMessage({}),
      type: 'email',
      name: 'email',
      value: data['email'],
      isRequired: true,
      events: {
      },
    });

    const login = new Input({
      text: 'Login',
      error: new ErrorMessage({}),
      type: 'text',
      name: 'login',
      value: data['login'],
      isRequired: true,
      events: {
      },
    });

    const phone = new Input({
      text: 'Phone',
      error: new ErrorMessage({}),
      type: 'tel',
      value: data['phone'],
      name: 'phone',
      isRequired: true,
      events: {

      },
    });

    return [
      displayName,
      firstName,
      secondName,
      email,
      login,
      phone,
    ]
  }

   componentDidUpdate(oldProps: any, newProps: any): boolean {
     return true;
   }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUser = withStore((state) => ({...state.user}));
const SettingsPage = withUser(SettingsBase);
export {SettingsPage};
