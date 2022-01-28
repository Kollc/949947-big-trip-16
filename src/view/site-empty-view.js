import SiteAbstractView from './site-abstract-view.js';
import { FilterType } from '../consts.js';

const NoTasksTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};

const createSiteEmptyTemplate = (filterType) => {
  const noTaskTextValue = NoTasksTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noTaskTextValue}
    </p>`);
};

export default class SiteEmptyView extends SiteAbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createSiteEmptyTemplate(this._data);
  }
}
