import AbstractView from './abstract-view.js';

const createSiteListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class SiteListView extends AbstractView {
  get template() {
    return createSiteListTemplate();
  }
}
