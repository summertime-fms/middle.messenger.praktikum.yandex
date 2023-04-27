import Block from '../../helpers/Block';
import ChatsList from './Blocks/ChatsList';
import template from './template.hbs';
import styles from './styles.module.pcss';
import ChatWindow from './Blocks/ChatWindow';
import Button from '../../components/Button';
import Message from '../../components/Message';
import { messagesArr, submitSettingsButton as submitButton, settingsFormLabels as labels } from '../../helpers/mocks';
import Settings from './Blocks/Settings';
import Form from '../../components/Form';
import { withStore} from "../../helpers/Store";
import {Link} from "../../components/Link";
import AuthController from "../../controllers/AuthController";
const messages: Message[] = messagesArr.map((message) => new Message(message));
console.log(styles)
interface ChatPageProps {
  isSettingsOpened?: boolean
}

const chats = [
  {
    id: 1,
    name: 'Имя',
    messagePreview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: true,
  },
  {
    id: 2,
    name: 'Имя 2',
    messagePreview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: false,
  },
  {
    id: 3,
    name: 'Имя 3',
    messagePreview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: true,
  },
  {
    id: 4,
    name: 'Имя 4',
    messagePreview: 'Сообщение сообщение сообщение',
    time: '15:29',
    totalNewMessages: 10,
    isRead: true,
  },
];

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
      chats
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
