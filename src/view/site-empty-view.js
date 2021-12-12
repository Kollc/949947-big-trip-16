import AbstractView from './abstract-view.js';

const createSiteEmptyTemplate = () => (
  '<p class="trip-events__msg">Click New Event to create your first point</p>'
);

export default class SiteEmptyView extends AbstractView {
  get template() {
    return createSiteEmptyTemplate();
  }
}
