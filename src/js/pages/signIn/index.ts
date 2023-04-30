import Block from '../../helpers/Block';
import Form from '../../components/Form';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import template from './template.hbs';
import styles from './styles.module.pcss';
import AuthController from './../../controllers/AuthController';
import {Link} from '../../components/Link';
import {withStore} from '../../helpers/Store';
import authController from "./../../controllers/AuthController";
interface SignInPageProps {
  title: string
}

const loginLabel = new Label({
  label: 'Login',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'text',
    value: 'test',
    name: 'login',
    isRequired: true,
    events: {},
  }),
});

const passwordLabel = new Label({
  label: 'Password',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'password',
    name: 'password',
    isRequired: true,
    events: {},
  }),
});

const submitButton: Button = new Button({
  text: 'Sign in',
  type: 'submit',
  events: {},
  classes: 'button form__button',
});


const labels: Array<Label> = [
  loginLabel, passwordLabel,
];

export default class SignInPageBase extends Block {
  constructor(props: SignInPageProps) {
    super(props);
  }

  init() {
    this.props.title = 'Sign in';
    this.children.signInForm = new Form({
      labels,
      submitButton,
      events: {
        submit: function() {
          const values = labels.map((label: Label): string[] => {
            const input = label.children.input;
            const {name} = input.props;
            const {value} = input._element;
            return [name, value];
          });


          const signInData = Object.fromEntries(values);
          AuthController.signin(signInData);
        }
      },
    });

    this.children.autoCompleteButton = new Button({
      text: 'Autocomplete',
      type: 'button',
      classes: styles.autocomplete,
      events: {
        click: () => {
          this.autoCompleteFields();
        }
      }
    });

    this.children.logoutButton = new Button({
      text: 'Logout',
      type: 'button',
      classes: styles.logout,
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    });

    this.children.signUpLink = new Link({
      text: 'Have no account? Sign up!',
      class: 'auth__sign-up',
      to: '/sign-up',
      events: {
      }
    })
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }

  get inputs() {
    return this.children.signInForm.children.labels.map((label: Label) => label.children.input);
  }

  autoCompleteFields() {
    const loginInput = this.inputs[0];
    const passwordInput = this.inputs[1];

    loginInput.element.value = 'rootroot';
    passwordInput.element.value = 'RootRoot1'
  }
}

const withStoreWrapper = withStore((state) => ({...state.auth}));
const signInPage = withStoreWrapper(SignInPageBase);
export {signInPage}
