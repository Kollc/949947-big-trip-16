import {createElement} from './../utils/render';

const createSiteListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

export default class SiteListView {
  #element = null;

  get element() {
    if(!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createSiteListTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
