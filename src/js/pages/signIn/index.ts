import Block from '../../helpers/Block';
import Form from '../../components/Form';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { validate } from '../../helpers/validation';
import template from './template.hbs';
import withStore from './../../helpers/Store';
import AuthController from './../../controllers/AuthController';
interface SignInPageProps {
  title: string
}

const loginLabel = new Label({
  label: 'Login',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'text',
    name: 'login',
    isRequired: true,
    events: {
      // blur() {
      //   validate(loginLabel.children.input, loginLabel);
      // },
      // focus() {
      //   validate(loginLabel.children.input, loginLabel);
      // },
    },
  }),
});

const passwordLabel = new Label({
  label: 'Password',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'password',
    name: 'password',
    isRequired: true,
    events: {
      // blur() {
      //   validate(passwordLabel.children.input, passwordLabel);
      // },
      // focus() {
      //   validate(passwordLabel.children.input, passwordLabel);
      // },
    },
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

export default class SignInPage extends Block {
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
  }

  componentDidMount() {

  }

  render() {
    return this.compile(template, this.props);
  }
}
