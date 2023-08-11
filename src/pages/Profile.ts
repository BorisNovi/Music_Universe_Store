import TemplateView from './TemplateView';
import './Profile.scss';

export default class Profile extends TemplateView {
  constructor() {
    super();
    this.setTitle('Profile');
  }

  public async getHtml(): Promise<string> {
    return `<div class="profile">This is Profile page</div>`;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
