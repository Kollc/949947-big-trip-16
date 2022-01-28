import SiteAbstractView from './site-abstract-view.js';

const createSiteListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class SiteListView extends SiteAbstractView {
  get template() {
    return createSiteListTemplate();
  }
}
