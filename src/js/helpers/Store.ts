import { User } from '../api/Auth';
import Block from './Block';
import EventBus from './EventBus';
import { set } from './utils';

export enum StoreEvents {
  Updated = 'Updated',
}

type State = {
  user: {
    data: null | User;
    isLoading: boolean;
    hasError: boolean;
    avatar?: Record<string, string>,
    passwordError?: string
  },
  auth?: {
    signUpError?: string,
    signInError?: string
  }
}

const initialState: State = {
  user: {
    data: null,
    isLoading: true,
    hasError: false
  }
};

class Store extends EventBus {
  private state = initialState;
  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated, this.state);
  }
  public getState() {
    return this.state;
  }
}
const store = new Store();

export const withStore = (mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);
          this.setProps(newMappedState);
        });
      }
    }
  }
}

export { store };
