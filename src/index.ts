import template from './html/pages/sign-in.hbs';

const render = (): void =>{
  console.log(template);
  const html = template({});
  document.querySelector('#app').innerHTML = html;
}

render();
