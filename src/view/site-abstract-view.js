import {
  createElement
} from '../utils/render';

export default class SiteAbstractView {
  #element = null;
  _callback = {};

  constructor() {
    if (this.evt === SiteAbstractView) {
      throw new Error('Can\'t instantiate AbstractView, only concrete one.');
    }
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    throw new Error('Abstract method not implemented: get template');
  }

  removeElement() {
    this.#element = null;
  }
}
