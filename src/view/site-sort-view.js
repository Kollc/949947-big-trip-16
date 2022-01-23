import AbstractView from './abstract-view.js';
import {
  SortType
} from '../consts.js';

const createSiteSortTemplate = (currentSortType) => (
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    <div class="trip-sort__item  trip-sort__item--day">
      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" ${currentSortType === SortType.DEFAULT ? 'checked' : '' }>
      <label class="trip-sort__btn" for="sort-day" data-sort-type="${SortType.DEFAULT}">Day</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--event">
      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
      <label class="trip-sort__btn" for="sort-event">Event</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--time">
      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" ${currentSortType === SortType.BY_TIME ? 'checked' : '' }>
      <label class="trip-sort__btn" for="sort-time" data-sort-type="${SortType.BY_TIME}">Time</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--price">
      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" ${currentSortType === SortType.BY_PRICE ? 'checked' : '' }>
      <label class="trip-sort__btn" for="sort-price" data-sort-type="${SortType.BY_PRICE}">Price</label>
    </div>

    <div class="trip-sort__item  trip-sort__item--offer">
      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
      <label class="trip-sort__btn" for="sort-offer">Offers</label>
    </div>
  </form>`
);

export default class SiteSortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSiteSortTemplate(this.#currentSortType);
  }

  setSortTypeChangeHalder = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    const currentInput = evt.target.parentNode.querySelector('.trip-sort__input');

    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();

    if (!currentInput.hasAttribute('disabled')) {
      this._callback.sortTypeChange(evt.target.dataset.sortType);
    }
  }

  #addCheckedAttributeToInput = (inputs, currentInput) => {
    inputs.forEach((input) => input.removeAttribute('checked'));
    currentInput.setAttribute('checked', true);
  }
}
