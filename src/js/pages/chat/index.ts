import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

import ChatsList from './Blocks/ChatsList';
import ChatWindow from './Blocks/ChatWindow';
import Button from '../../components/Button';
import Message from '../../components/Message';
import Settings from './Blocks/Settings';
import Dialog, {DialogProps} from "../../components/Dialog";
import Form from '../../components/Form';
import {Link} from "../../components/Link";

import { messagesArr, submitSettingsButton as submitButton, settingsFormLabels as labels, dialogsData } from '../../helpers/mocks';

import { withStore} from "../../helpers/Store";
import AuthController from "../../controllers/AuthController";

const messages: Message[] = messagesArr.map((message) => new Message(message));
const dialogs: Dialog[] = dialogsData.map((dialog: DialogProps) => new Dialog(dialog));
interface ChatPageProps {
  isSettingsOpened?: boolean
}

const settingsForm = new Form({
  labels,
  submitButton,
  events: {},
});

export default class ChatPage extends Block {
  protected isSettingsOpened: boolean;

  constructor(props: ChatPageProps) {
    super(props);
    this.isSettingsOpened = false;
  }

  init() {
    this.children.chatsList = new ChatsList({
      dialogs
    });

    this.children.chatWindow = new ChatWindow({
      messages,
    });

    this.children.settingsModal = new Settings({
      title: 'Settings',
      isOpened: false,
      form: settingsForm,
    });

    this.children.settingsButton = new Button({
      text: 'Settings',
      classes: 'chats__settings',
      type: 'button',
      events: {
        click: () => {
          this.children.settingsModal._show();
        },
      },
    });

    this.children.logoutLink = new Link({
      text: 'Logout',
      class: 'chats__settings',
      events: {
        click() {
          AuthController.logout()
        }
      }
    });
  }

  componentDidMount() {
    // authController.fetchUser()
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUser = withStore((state) => ({...state.user}));

export const Chat = withUser(ChatPage);
