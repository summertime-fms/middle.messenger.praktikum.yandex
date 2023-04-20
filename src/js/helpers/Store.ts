import EventBus from './EventBus';
import {set} from './utils'
import {User} from '../api/Auth';
import Block from './Block';

interface State {
  user: {
    data: User,
    isLoading: boolean,
    error: string
  }
}
export enum StoreEvents {
  Updated = 'Updated'
}
class Store extends EventBus {
  state: State;

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated, this.state)
  }

  public getState() {
    return this.state;
  }

}

const store = new Store();

export default function withStore(mapStateToProps: (state: State) => any) {
  return (component: typeof Block) => {
    return class withStore extends component {
      constructor(props: any) {
        const mappedState = mapStateToProps(store.getState());
        super({...props, mappedState});

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState)
          this.setProps(newMappedState);
        })
      }
    }
  }
}

export {store}
