import Block from '../../../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import Input from "../../../../components/Input";
import {debounce, getChangedProps} from "../../../../helpers/utils";
import UserController from "../../../../controllers/UserController";
import {withStore} from "../../../../helpers/Store";
interface SearchProps {
  isActive?: boolean,
}

export default class SearchBase extends Block {
  constructor(props: SearchProps) {
    super(props);
  }

  init() {
    this.children.searchInput = new Input({
      type: 'search',
      text: 'search users',
      name: 'login',
      isRequired: true,
      events: {
        keydown: async () => {
          const getUsers = debounce(() => {
            UserController.searchUsers({
              login: this.searchValue
            });
          }, 350);

          await getUsers();
        },
        focus: () => {
          this.setProps({
            isActive: true
          });
        }
      }
    })
  }

  get searchValue() {
    return this.children.searchInput.props.value;
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    console.log('bruh')
    const changedProps = getChangedProps(oldProps, newProps);
    if (changedProps.includes('isActive')) {
      this.element.classList.toggle(`${styles['is-active']}`);
    }
  }


  render() {
    return this.compile(template, {...this.props, styles});
  }
}

const withUserSearch = withStore((state) => ({...state.user.search}))

const Search = withUserSearch(SearchBase);
export { Search };

