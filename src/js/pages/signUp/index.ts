import Block from '../../helpers/Block';
import Label from '../../components/Label';
import template from './template.hbs';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { validate } from '../../helpers/validation';
import { renderDom } from '../../helpers/renderDOM';

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
      blur() {
        validate(firstNameLabel.children.input, firstNameLabel);
      },
      focus() {
        validate(firstNameLabel.children.input, firstNameLabel);
      },
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
      blur() {
        validate(secondNameLabel.children.input, secondNameLabel);
      },
      focus() {
        validate(secondNameLabel.children.input, secondNameLabel);
      },
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
      blur() {
        validate(loginLabel.children.input, loginLabel);
      },
      focus() {
        validate(loginLabel.children.input, loginLabel);
      },
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
      blur() {
        validate(passwordLabel.children.input, passwordLabel);
      },
      focus() {
        validate(passwordLabel.children.input, passwordLabel);
      },
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
      blur() {
        validate(phoneLabel.children.input, phoneLabel);
      },
      focus() {
        validate(phoneLabel.children.input, phoneLabel);
      },
    },
  }),
});

const emailLabel = new Label({
  label: 'Phone',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'tel',
    name: 'phone',
    isRequired: true,
    events: {
      blur() {
        validate(emailLabel.children.input, emailLabel);
      },
      focus() {
        validate(emailLabel.children.input, emailLabel);
      },
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
    this.children.signUpForm = new Form({
      labels,
      submitButton,
      events: {},
    });
  }

  componentDidMount() {
    const links: Array<HTMLElement> = this.element.querySelectorAll('.nav a');
    Array.from(links).forEach((link) => {
      link.addEventListener('click', (evt: any) => {
        evt.preventDefault();
        const { page } = link.dataset;
        renderDom(page!);
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
