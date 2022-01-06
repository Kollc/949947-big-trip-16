import AbstractView from './abstract-view.js';

const createSiteMenuTemplate = () => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn" href="#">Table</a>
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
  </nav>`
);

export default class SiteMenuView extends AbstractView {
  get template() {
    return createSiteMenuTemplate();
  }
}