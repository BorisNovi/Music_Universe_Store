/* eslint-disable max-lines-per-function */
import TemplateView from '../template-view/template-view';
import './main-page.scss';

export default class Main extends TemplateView {
  constructor() {
    super();
    this.setTitle('Main');
  }

  public async getHtml(): Promise<string> {
    return `
    <div class="main-banner" style="background-image: url(../assets/img/banner.png)">
        <p>Your best <br>
        summer sound!</p>
        <button class="learn-more"><a href="">Learn more</a></button>
    </div>
    <div class="main-categories">
        <div class="main-headphones">
            <div class="main-headphones title">HEADPHONES</div>
            <a href="/headphones"><img src="../assets/img/main-headphones.png" alt="none"></a>
        </div>
        <div class="main-speakers">
            <div class="main-speakers title">SPEAKERS</div>
            <a href="/speakers"><img src="../assets/img/main-speakers.png" alt="none"></a>
        </div>
        <div class="main-turntables">
            <div class="main-turntables title">TURNTABLES</div>
            <a href="/turntables"><img src="../assets/img/main-turntables.png" alt="none"></a>
        </div>
        <div class="main-amplifiers">
            <div class="main-amplifiers title">AMPLIFIERS</div>
            <a href="/amplifiers"><img src="../assets/img/main-amplifiers.png" alt="none"></a>
        </div>
        <div class="main-soundbars">
            <div class="main-soundbars title">SOUNDBARS</div>
            <a href="/soundbars"><img src="../assets/img/main-soundbars.png" alt="none"></a>
        </div>
        <div class="main-controllers">
            <div class="main-controllers title">DJ Controllers</div>
            <a href="/controllers"><img src="../assets/img/main-controllers.png" alt="none"></a>
        </div>
    </div>
    <div class="main-follow">
        <div class="main-follow women" style="background-image: url(../assets/img/banner2.png)">
            <p>Follow your<br> soul.<br> And we’ll help you with that.</p>
        </div>
    </div>
    <div class="main-advantages">
        <div class="main-advantages-title">
            Making an order with us,<br>
            you get:
        </div>
        <div class="main-advantages list">
            <div class="main-advantages prices">
                <img src="../assets/img/advantages/pig.png" alt="none">
                <div class="main-advantages description">
                    low<br>
                    prices
                </div>
            </div>
            <div class="main-advantages advice">
                <img src="../assets/img/advantages/support.png" alt="none">
                <div class="main-advantages description">
                    friendly<br>
                    advice
                </div>
            </div>
            <div class="main-advantages delivery">
                <img src="../assets/img/advantages/car.png" alt="none">
                <div class="main-advantages description">
                    fast<br>
                    delivery
                </div>
            </div>
            <div class="main-advantages package">
                <img src="../assets/img/advantages/package.png" alt="none">
                <div class="main-advantages description">
                    reliable<br>
                    packaging<br>
                </div>
            </div>
            <div class="main-advantages ambient">
                <img src="../assets/img/advantages/ambient.png" alt="none">
                <div class="main-advantages description">
                    minimum<br>
                    percentage<br>
                    of defects
                </div>
            </div>
            <div class="main-advantages loyalty">
                <img src="../assets/img/advantages/loyalty.png" alt="none">
                <div class="main-advantages description">
                    discount<br>
                    of a regular<br>
                    customer
                </div>
            </div>
        </div>
    </div>
    <div class="main-holiday" style="background-image: url(../assets/img/holiday.png)">
        <p>Treat yourself<br>
        to a holiday!</p>
    </div>
    `;
  }

  public setTitle(title: string): void {
    document.title = title;
  }
}
