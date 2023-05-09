import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';

import ChatsList from './Blocks/ChatsList';
import ChatWindow from './Blocks/ChatWindow';
import Button from '../../components/Button';
import Message from '../../components/Message';
import {Settings} from './Blocks/Settings';
import settingsTemplate from './Blocks/Settings/template.hbs';
import Modal from './../../components/Modal';
import Dialog, {DialogProps} from "../../components/Dialog";
import {Link} from "../../components/Link";
import { messagesArr, dialogsData } from '../../helpers/mocks';
import { withStore} from "../../helpers/Store";
import AuthController from "../../controllers/AuthController";

const messages: Message[] = messagesArr.map((message) => new Message(message));
const dialogs: Dialog[] = dialogsData.map((dialog: DialogProps) => new Dialog(dialog));
import logoutIcon from './../../../img/sprite/logout.svg';

console.log(logoutIcon)
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

    this.children.settingsModal = new Modal({
      innerComponent: Settings,
      contentTemplate: settingsTemplate,
      isOpened: false
    });

    this.children.settingsButton = new Button({
      text: 'Settings',
      type: 'button',
      events: {
        click: () => {
          this.children.settingsModal.setProps({
            isOpened: true
          });
        },
      },
    });

    this.children.logoutLink = new Link({
      text: 'Logout',
      icon: {
        width: 25,
        height: 25,
        hash: logoutIcon
      },
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
    return this.compile(template, {...this.props, styles, icons: {logoutIcon}});
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const ChatPage = withUser(ChatPageBase);
export { ChatPage };
