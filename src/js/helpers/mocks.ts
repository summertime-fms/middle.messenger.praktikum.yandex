import Button from '../components/Button';
import { validate } from './validation';
import Label from '../components/Label';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import { MessageProps } from '../components/Message';

export const messagesArr: Array<MessageProps> = [
  {
    text: 'сообщение',
    time: '14:35',
    sender: 'from',
  },
  {
    text: 'сообщение2',
    time: '14:35',
    sender: 'to',
  },
  {
    text: 'сообщение3',
    time: '14:35',
    sender: 'from',
  },
  {
    text: 'сообщение4',
    time: '14:35',
    sender: 'to',
  },
  {
    text: 'сообщение5',
    time: '14:35',
    sender: 'from',
  },
  {
    text: 'сообщение6',
    time: '14:35',
    sender: 'to',
  },
];
export const submitSettingsButton: Button = new Button({
  text: 'Save',
  type: 'submit',
  classes: 'button form__button',
  events: {},
});

const displayNameLabel = new Label({
  label: 'Display Name',
  error: new ErrorMessage({}),
  input: new Input({
    type: 'text',
    name: 'display_name',
    isRequired: true,
    events: {
      blur: () => {
        validate(displayNameLabel.children.input, displayNameLabel);
      },
      focus: () => {
        validate(displayNameLabel.children.input, displayNameLabel);
      },
    },
  }),
});
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
      focus: () => {
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
      focus: () => {
        validate(secondNameLabel.children.input, secondNameLabel);
      },
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
      blur() {
        validate(emailLabel.children.input, emailLabel);
      },
      focus: () => {
        validate(emailLabel.children.input, emailLabel);
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
      focus: () => {
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
      focus: () => {
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
      focus: () => {
        validate(phoneLabel.children.input, phoneLabel);
      },
    },
  }),
});
export const settingsFormLabels: Label[] = [
  displayNameLabel,
  firstNameLabel,
  secondNameLabel,
  emailLabel,
  loginLabel,
  passwordLabel,
  phoneLabel,
];

export const dialogsData = [
  {
    id: 1,
    name: 'Имя',
    preview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: true,
  },
  {
    id: 2,
    name: 'Имя 2',
    preview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: false,
  },
  {
    id: 3,
    name: 'Имя 3',
    preview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: true,
  },
  {
    id: 4,
    name: 'Имя 4',
    preview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: true,
  },
];
