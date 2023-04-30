import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import {User} from "../../../../api/Auth";
import {withStore} from "../../../../helpers/Store";
import UserController from "../../../../controllers/UserController";
import Button from "../../../../components/Button";
import Label from "../../../../components/Label";
import Form from "../../../../components/Form";
import Input from "../../../../components/Input";
import ErrorMessage from "../../../../components/ErrorMessage";
interface SettingsProps {
  title: string,
  isOpened: boolean,
  activeClass?: string,
  userData: User | null,
}

export default class SettingsBase extends Block {
  private labels: Label[];
  constructor(props: SettingsProps) {
    super(props);
  }

  init() {
    const labels: Label[] = this.createLabels(this.props.data);
    this.labels = labels;

    this.children.form = new Form({
      submitButton: new Button({
        text: 'Save',
        type: 'submit',
        events: {}
      }),

      labels,
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
  }

  getUserData() {
    const values = this.children.labels.map((label: Label): string[] => {
      const input = label.children.input;
      const {name, value} = input.props;
      return [name, value];
    });

    return Object.fromEntries(values);
  }

  createLabels(data: Record<string, string>) {
    const displayNameLabel = new Label({
      label: 'Display Name',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'text',
        value: data['display_name'],
        name: 'display_name',
        isRequired: true,
        events: {

        },
      }),
    });
    const firstNameLabel = new Label({
      label: 'First Name',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'text',
        value: data['first_name'],
        name: 'first_name',
        isRequired: true,
        events: {
        },
      }),
    });
    const secondNameLabel = new Label({
      label: 'Second Name',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'text',
        value: data['second_name'],
        name: 'second_name',
        isRequired: true,
        events: {

        },
      }),
    });
    const emailLabel = new Label({
      label: 'Email',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'email',
        name: 'email',
        value: data['email'],
        isRequired: true,
        events: {
        },
      }),
    });
    const loginLabel = new Label({
      label: 'Login',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'text',
        name: 'login',
        value: data['login'],
        isRequired: true,
        events: {
        },
      }),
    });
    const passwordLabel = new Label({
      label: 'Password',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'password',
        name: 'password',
        value: data['password'],
        isRequired: true,
        events: {

        },
      }),
    });
    const phoneLabel = new Label({
      label: 'Phone',
      error: new ErrorMessage({}),
      input: new Input({
        type: 'tel',
        value: data['phone'],
        name: 'phone',
        isRequired: true,
        events: {

        },
      }),
    });

    return [
      displayNameLabel,
      firstNameLabel,
      secondNameLabel,
      emailLabel,
      loginLabel,
      passwordLabel,
      phoneLabel,
    ]
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    console.trace()
    console.log('sets updated')
  }

  render() {
    console.log(this.labels);
    return this.compile(template, {...this.props, styles});
  }
}


const withUser = withStore((state) => ({...state.user}));
const SettingsPage = withUser(SettingsBase);
export {SettingsPage};
