import dayjs from 'dayjs';

import {
  capitalize
} from './../utils/capitalize';

import AbstractView from './abstract-view.js';

import {
  CITY_LIST,
  POINT_TYPE_LIST,
} from './../consts.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: {},
  offersContainer: {},
  type: 'bus',
};

const createSiteEditTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers: offersContainer,
    type,
  } = point;

  const createEventTypeListTemplate = () => {
    if (POINT_TYPE_LIST) {
      const resultPoint = POINT_TYPE_LIST.map((pointType) => (
        `<div class="event__type-item">
          <input id="event-type-${pointType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType}">
          <label class="event__type-label  event__type-label--${pointType}" for="event-type-${pointType}-1">${capitalize(pointType)}</label>
        </div>`));

      return `<div class="event__type-list">
                <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${resultPoint.join('')}
              </fieldset>
            </div>`;
    }

    return '';
  };

  const createOffersListTemplate = () => {
    const {
      offers
    } = offersContainer;

    if (offers) {
      const result = offers.map(({
        title,
        id,
        price
      }) => (
        `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}">
            <label class="event__offer-label" for="event-offer-${title}-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`
      ));

      return `
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${result.join('')}
        </div>
      </section>`;
    }

    return '';
  };

  const createDestinationPointTemplate = () => {
    if (CITY_LIST) {
      const result = CITY_LIST.map((city) => (`<option value = "${city}"></option>`));

      return `<datalist id = "destination-list-1">
                ${result.join('')}
              </datalist>`;
    }

    return '';
  };

  const convertDateFormat = (date) => (dayjs(date).format('DD/MM/YY HH:mm'));

  const createDateTimeInputTemplate = () => (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDateFormat(dateFrom)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDateFormat(dateTo)}">
    </div>`
  );

  const createPhotosTemplate = (pictures) => {
    if (pictures) {
      const result = pictures.map(({
        src,
        description
      }) => `<img class="event__photo" src="${src}" alt="${description}">`);
      return `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${result.join('')}
                </div>
              </div>`;
    }

    return '';
  };

  const destinationDescription = destination.description ? destination.description : '';
  const destinationPictures = destination.pictures ? destination.pictures : [];

  const createDestinationDescriptionTemplate = () => {
    if (destinationDescription || destinationPictures.length) {
      return `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">
                ${destinationDescription}
                </p>
                ${createPhotosTemplate(destination.pictures)}
              </section>`;
    }

    return '';
  };

  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      ${createEventTypeListTemplate()}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Chamonix" list="destination-list-1">
      ${createDestinationPointTemplate()}
    </div>

    ${createDateTimeInputTemplate()}

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
      ${createOffersListTemplate()}
      ${createDestinationDescriptionTemplate()}
  </section>
</form>`;
};

export default class SiteEmptyView extends AbstractView {
  #point = null;
  #buttonClose = null;

  constructor(point = BLANK_POINT) {
    super();
    this.#point = point;
    this.#buttonClose = this.element.querySelector('.event__rollup-btn');
  }


  get template() {
    return createSiteEditTemplate(this.#point);
  }

  setCloseEditClickHandler = (callback) => {
    this._callback.clickClose = callback;
    this. #buttonClose.addEventListener('click', this.#editCloseClickHandler);
  }

  #editCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickClose();
  }

  setEditSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.addEventListener('click', this.#editSubmitHandler);
  }

  #editSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit();
  }

  removeEventSubmitHandler = () => {
    this.element.removeEventListener('click', this.#editSubmitHandler);
  }

  removeEventCloseClickHandler = () => {
    this. #buttonClose.addEventListener('click', this.#editCloseClickHandler);
  }
}
