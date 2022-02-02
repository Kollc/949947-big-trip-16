import SiteAbstractView from './site-abstract-view.js';

const createNoTaskTemplate = () => (
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>'
);

export default class SiteButtonNewEventView extends SiteAbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
