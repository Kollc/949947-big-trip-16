import { MenuItem } from '../consts.js';
import SiteSmartView from './site-smart-view.js';

const createSiteMenuTemplate = (currentPage) => `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn ${currentPage === MenuItem.TABLE ? 'trip-tabs__btn--active' : ''}" href="#" data-page="${MenuItem.TABLE}">
      ${MenuItem.TABLE}
    </a>
    <a class="trip-tabs__btn ${currentPage === MenuItem.STATS ? 'trip-tabs__btn--active' : ''}" href="#" data-page="${MenuItem.STATS}">
      ${MenuItem.STATS}
    </a>
  </nav>`;

export default class SiteMenuView extends SiteSmartView {
  constructor() {
    super();
    this._data.currentPage = MenuItem.TABLE;

    this.setMenuClickHandler(this._callback.menuClick);
  }

  restoreHandlers = () => {
    this.setMenuClickHandler(this._callback.menuClick);
  }

  get template() {
    return createSiteMenuTemplate(this._data.currentPage);
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.querySelectorAll('.trip-tabs__btn').forEach((link) => {
      link.addEventListener('click', this.#menuClickHandler);
    });
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();

    this.updateData({
      currentPage: evt.target.dataset.page,
    });

    this._callback.menuClick(evt.target.dataset.page);
  }
}
