import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import {withStore} from "../../helpers/Store";
import AuthController from "../../controllers/AuthController";

//chat-comps
import ChatsList from './Blocks/ChatsList';
import ChatWindow from './Blocks/ChatWindow';
import {Settings} from './Blocks/Settings';
import {PasswordSettings} from './Blocks/PasswordSettings';
//common-comps
import Button from '../../components/Button';
import Message from '../../components/Message';
import Modal from './../../components/Modal';
import Dialog, {DialogProps} from "../../components/Dialog";
import {Link} from "../../components/Link";

// icons
import logoutIcon from './../../../img/sprite/logout.svg';
import settingsIcon from './../../../img/sprite/settings.svg';
import passwordIcon from './../../../img/sprite/password.svg';

import { messagesArr, dialogsData } from '../../helpers/mocks';

const messages: Message[] = messagesArr.map((message) => new Message(message));
const dialogs: Dialog[] = dialogsData.map((dialog: DialogProps) => new Dialog(dialog));

interface ChatPageProps {
  isSettingsOpened?: boolean;
  visibleName: string;
  letter: string
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
      title: 'Settings',
      innerComponent: Settings,
      isOpened: false
    });

    this.children.passwordModal = new Modal({
      title: 'Password',
      innerComponent: PasswordSettings,
      isOpened: false
    });

    this.children.settingsButton = new Button({
      text: 'Settings',
      type: 'button',
      icon: {
        width: 25,
        height: 25,
        hash: settingsIcon
      },
      events: {
        click: () => {
          this.children.settingsModal.setProps({
            isOpened: true
          });
        },
      },
    });

    this.children.passwordButton = new Button({
      text: 'Password',
      icon: {
        width: 26,
        height: 26,
        hash: passwordIcon
      },
      type: 'button',
      events: {
        click: () => {
          this.children.passwordModal.setProps({
            isOpened: true
          });
        },
      },
    })

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

    this.setProps({
      letter: (this.props.data.display_name || this.props.data.first_name).split('')[0].toUpperCase(),
      currentName: this.props.data.display_name || this.props.data.first_name
    })


    this.dispatchComponentDidMount();
  }

  componentDidUpdate(): boolean {
    return false;
  }

  render() {
    return this.compile(template, {...this.props, styles, icons: {logoutIcon}});
  }
}

const withUser = withStore((state) => ({ ...state.user }));

const ChatPage = withUser(ChatPageBase);
export { ChatPage };
