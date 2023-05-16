import Block from '../../helpers/Block';
import template from './template.hbs';
import styles from './styles.module.pcss';
import withRouter from "../../hocs/withRouter";
interface LinkProps {
  text: string;
  class: string,
  to: string,
  events?: Record<string, () => void>,
  icon?: {
    width: number,
    height: number,
    hash: string
  }
}
export default class BaseLink extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => {
          if (props.events?.click) {
            const handler = props.events?.click;
            handler();
          } else {
            this.navigate()
          }
        }
      },
    });
  }
  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, {...this.props, styles});
  }
}

export const Link = withRouter(BaseLink);
