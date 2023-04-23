import Block from '../../helpers/Block';
import Label from '../../components/Label';
import template from './template.hbs';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthController from "../../controllers/AuthController";
import {Link} from "../../components/Link";
interface SignUpPageProps {
  title: string
}

const firstNameLabel = new Label({
  label: 'First Name',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'text',
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
    name: 'second_name',
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
    name: 'phone',
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
    isRequired: true,
    events: {

    },
  }),
});


const submitButton: Button = new Button({
  text: 'Sign up',
  type: 'submit',
  events: {},
  classes: 'button form__button',
});

const labels: Label[] = [
  firstNameLabel,
  secondNameLabel,
  emailLabel,
  loginLabel,
  passwordLabel,
  phoneLabel,
];

export default class SignUpPage extends Block {
  constructor(props: SignUpPageProps) {
    super(props);
  }

  init() {
    this.props.title = 'Sign Up';
    this.children.signInLink = new Link({
      text: 'Already have an account?',
      class: 'auth__sign-up',
      to: '/',
      events: {}
    });

    console.log(this.children.signInLink)

    this.children.signUpForm = new Form({
      labels,
      submitButton,
      events: {
        submit() {
          const values = labels.map((label: Label): string[] => {
            const input = label.children.input;
            const {name} = input.props;
            const {value} = input._element;
            return [name, value];
          });


          const signInData = Object.fromEntries(values);
          AuthController.signup(signInData);
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
