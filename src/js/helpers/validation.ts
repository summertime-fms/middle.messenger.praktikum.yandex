import Input from '../components/Input';
import Label from '../components/Label';

interface ValidationHelper {
  regExp: RegExp,
  errorMessage: string
}

const REGEXPS: Record<string, ValidationHelper> = {
  LOGIN: {
    regExp: /^(?=.*[A-Za-z])[A-Za-z0-9-_]{3,20}$/i,
    errorMessage: 'Длина логина должна быть от 3 до 20 символов. Логин не может состоять из одних цифр или содержать спец. символы, пробелы',
  },
  PASSWORD: {
    /* eslint-disable */
    regExp: /[A-ZА-Я][a-zа-я\-]*/,
    /* eslint-enable */
    errorMessage: 'Длина пароля должна быть от 8 до 40 символов. Пароль должен содержать хотя бы одну заглавную букву и одну цифру.',
  },
  FIRST_NAME: {
    regExp: /[A-ZА-Я][a-zа-я][0-9]*/,
    errorMessage: 'Должна быть заглавная буква, запрещены спец. символы (кроме дефиса) и цифры',
  },
  SECOND_NAME: {
    regExp: /[A-ZА-Я][a-zа-я][0-9]*/,
    errorMessage: 'Должна быть заглавная буква, запрещены спец. символы (кроме дефиса) и цифры',
  },
  EMAIL: {
    regExp: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    errorMessage: 'Допускаются только латинские символы, должна быть @ и точка после нее.',
  },
  PHONE: {
    regExp: /\+?[0-9]{10,15}/,
    errorMessage: 'Телефон должен состоять из цифр. Длина должна быть от 10 до 15 символов.',
  },
  MESSAGE: {
    regExp: /^./,
    errorMessage: 'Нельзя отправить пустое сообщение',
  },
};

const validateInput = (input: Input): string | boolean => {
  const inputName = input.element.name;
  const { value } = input.element;

  const key = inputName.toUpperCase();

  if (!REGEXPS[key]) {
    throw new Error(`No associated rule with ${inputName} input`);
  }

  const { regExp, errorMessage } = REGEXPS[key];

  if (regExp.test(value) || !value.length) {
    return true;
  }

  return errorMessage;
};

type Errors = Record<string, string>

export const validateForm = (inputs: Input[]): Errors => {
  const errors: Errors = {};
  inputs.forEach((input) => {
    const { name } = input.element;
    const result: string | boolean = validateInput(input);
    if (typeof result === 'string') {
      errors[name] = result;
    }
  });

  return errors;
};

export const validate = (input: Input, label: Label): void => {
  const errorElem = label.children.error;
  const validateResult = validateInput(input);
  const errorContent = typeof validateResult === 'boolean' ? '' : validateResult;
  errorElem.setProps({
    errorContent,
  });
};
