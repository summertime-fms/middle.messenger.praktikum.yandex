import Block from '../../helpers/Block';
import template from './template.hbs';
import { renderDom } from '../../helpers/renderDOM';

interface ErrorPageProps {
  errorMessage: string
}
export default class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  init() {
    this.props.errorMessage = 'Error message will be here';
  }

  componentDidMount() {
    const links: HTMLLinkElement[] = this.element.querySelectorAll('.nav a');
    Array.from(links).forEach((link) => {
      link.addEventListener('click', (evt: any) => {
        evt.preventDefault();
        const { page } = link.dataset;
        renderDom(page!);
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
