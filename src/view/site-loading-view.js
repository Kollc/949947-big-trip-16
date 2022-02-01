import SiteAbstractView from './site-abstract-view.js';

const createNoTaskTemplate = () => (
  '<p class="trip-events__msg">Loading...</p>'
);

export default class SiteLoadingView extends SiteAbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
