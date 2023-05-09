import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import Input from "./../Input";
import ErrorMessage from "../ErrorMessage";
import userController from "../../controllers/UserController";
import {withStore} from "../../helpers/Store";
export interface UploadAvatarInterface {}

class UploadAvatarBase extends Block {
  constructor(props: UploadAvatarInterface) {
    super(props);
  }

  init() {
    this.children.uploadInput = new Input({
      text: 'Upload avatar',
      name: 'avatar',
      error: new ErrorMessage({}),
      type: 'file',
      isRequired: true,
      extraAttrs: {
        accept: 'image/*',
      },
      classes: [
        `${styles.uploadInput}`
      ],
      events: {
        change: async () => {
          const formData = new FormData();
          formData.append('avatar', this.input.files[0]);
          await userController.uploadAvatar(formData);
        }
      },
    });
  }

  get input() {
    return this.children.uploadInput.element.querySelector('[type="file"]');
  }

  // componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return false;
  // }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUser = withStore((state) => ({ ...state.user.avatar }));

const UploadAvatar = withUser(UploadAvatarBase);
export { UploadAvatar };
