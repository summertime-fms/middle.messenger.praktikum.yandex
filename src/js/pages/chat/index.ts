import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

import ChatsList from './Blocks/ChatsList';
import ChatWindow from './Blocks/ChatWindow';
import Button from '../../components/Button';
import Message from '../../components/Message';
import {SettingsPage} from './Blocks/Settings';
import Dialog, {DialogProps} from "../../components/Dialog";
import {Link} from "../../components/Link";
import { messagesArr, dialogsData } from '../../helpers/mocks';
import { withStore} from "../../helpers/Store";
import AuthController from "../../controllers/AuthController";

const messages: Message[] = messagesArr.map((message) => new Message(message));
const dialogs: Dialog[] = dialogsData.map((dialog: DialogProps) => new Dialog(dialog));
interface ChatPageProps {
  isSettingsOpened?: boolean
}
class ChatPageBase extends Block {
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

    this.children.settingsModal = new SettingsPage({});

    this.children.settingsButton = new Button({
      text: 'Settings',
      type: 'button',
      events: {
        click: () => {
          this.children.settingsModal._show();
        },
      },
    });

    this.children.logoutLink = new Link({
      text: 'Logout',
      events: {
        click() {
          AuthController.logout()
        }
      }
    });
    this.dispatchComponentDidMount();
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {

  }

  render() {
    console.log('rendering chat')
    return this.compile(template, {...this.props, styles});
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const ChatPage = withUser(ChatPageBase);
export { ChatPage };
