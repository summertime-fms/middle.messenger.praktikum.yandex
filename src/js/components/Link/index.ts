import Block from '../../helpers/Block';
import template from './template.hbs';
import withRouter from "../../hocs/withRouter";
interface LinkProps {
  text: string;
  class: string,
  to: string,
  events?: Record<string, () => void>
}
export default class BaseLink extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, this.props);
  }
}

export const Link = withRouter(BaseLink);
