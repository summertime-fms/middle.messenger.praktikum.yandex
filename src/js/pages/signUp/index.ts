import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import Form from '../../components/Form';
import ErrorMessage from '../../components/ErrorMessage';
import Button from '../../components/Button';
import Input from '../../components/Input';
import AuthController from "../../controllers/AuthController";
import {Link} from "../../components/Link";
interface SignUpPageProps {
  title: string
}

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

    this.children.signUpForm = new Form({
      inputs: [
        new Input({
          text: 'First Name',
          error: new ErrorMessage({}),
          type: 'text',
          name: 'first_name',
          isRequired: true,
          events: {},
        }),
        new Input({
          text: 'Second Name',
          error: new ErrorMessage({}),
          type: 'text',
          name: 'second_name',
          isRequired: true,
          events: {},
        }),
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
        }),
          new Input({
          text: 'Phone',
          error: new ErrorMessage({}),
          type: 'tel',
          name: 'phone',
          isRequired: true,
          events: {},
        }),
          new Input({
          text: 'Email',
          error: new ErrorMessage({}),
          type: 'email',
          name: 'email',
          isRequired: true,
          events: {},
        })
      ],

      submitButton: new Button({
        text: 'Sign up',
        type: 'submit',
        events: {},
        classes: 'button form__button',
      }),
      events: {
        submit() {
          const values = this.inputs.map((input: Input): string[] => {
            const {name, value} = input.props;
            return [name, value];
          });


          const signUpData = Object.fromEntries(values);
          AuthController.signup(signUpData);
        }
      },
    });
  }


  render() {
    return this.compile(template, {...this.props, styles});
  }
}
