import { moneyChartRender, timeChartRender, typeChartRender } from '../utils/stats.js';
import SiteSmartView from './site-smart-view.js';

const createStatisticsTemplate = () => (
  `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item">
        <canvas class="statistics__chart" id="money" width="900"></canvas>
      </div>

      <div class="statistics__item">
        <canvas class="statistics__chart" id="type" width="900"></canvas>
      </div>

      <div class="statistics__item">
        <canvas class="statistics__chart" id="time" width="900"></canvas>
      </div>

    </section>`);

export default class StatisticsView extends SiteSmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor(points) {
    super();

    this._data = {
      points,
    };

    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate(this._data);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  }


  restoreHandlers = () => {
    this.#setCharts();
  }

  #setCharts = () => {
    const {points} = this._data;
    const moneyCtx = this.element.querySelector('#money');
    const typeCtx = this.element.querySelector('#type');
    const timeCtx = this.element.querySelector('#time');

    this.#moneyChart = moneyChartRender(moneyCtx, points);
    this.#typeChart = typeChartRender(typeCtx, points);
    this.#timeChart = timeChartRender(timeCtx, points);
  }
}
