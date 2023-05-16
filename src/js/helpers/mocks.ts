import { validate } from './validation';
import Label from '../components/Label';
import ErrorMessage from '../components/ErrorMessage';
import Input from '../components/Input';
import { MessageProps } from '../components/Message';
import {store} from "./Store";
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
