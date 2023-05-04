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
interface SignInPageProps {
  title: string
}

const submitButton: Button = new Button({
  text: 'Sign in',
  type: 'submit',
  events: {},
  classes: 'button form__button',
});

export default class SignInPageBase extends Block {
  constructor(props: SignInPageProps) {
    super(props);
  }

  init() {
    this.props.title = 'Sign in';

    this.children.signInForm = new Form({
      inputs: [
        new Input({
          text: 'Login',
          error: new ErrorMessage({}),
          type: 'text',
          name: 'login',
          isRequired: true,
          events: {},
        }),
        new Input({
          text: 'Password',
          error: new ErrorMessage({}),
          type: 'password',
          name: 'password',
          isRequired: true,
          events: {},
        })
      ],
      submitButton,
      events: {
        submit: () => {
          const values = this.inputs.map((input: Input): string[] => {
            const {name, value} = input.props;
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
    return this.children.signInForm.children.inputs;
  }

  autoCompleteFields() {
    const loginInput = this.inputs[0];
    const passwordInput = this.inputs[1];

    loginInput.setProps({
      value: 'rootroot'
    });
    passwordInput.setProps({
      value: 'RootRoot1'
    })
  }
}

const withStoreWrapper = withStore((state) => ({...state.auth}));
const signInPage = withStoreWrapper(SignInPageBase);
export {signInPage}
