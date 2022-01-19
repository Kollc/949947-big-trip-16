import dayjs from 'dayjs';

import {
  capitalize
} from './../utils/capitalize';

import {
  CITY_LIST,
  POINT_TYPE_LIST,
} from './../consts.js';

import SmartView from './smart-view';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: {},
  offersContainer: {},
  type: 'bus',
};

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

const createOffersListTemplate = (offersContainer, isOffers) => {
  const {
    offers
  } = offersContainer;

  if (isOffers) {
    const result = [];

    offers.forEach(({title, id, price}) => {
      result.push(`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}">
          <label class="event__offer-label" for="event-offer-${title}-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`);
    });

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

const createPhotosTemplate = (pictures, isPictures) => {
  if (isPictures) {
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

const createDestinationDescriptionTemplate = (destination, isDestinationDescription, isDestinationPictures) => {
  const destinationDescription = destination.description ? destination.description : '';
  const destinationPictures = destination.pictures ? destination.pictures : [];

  if (isDestinationDescription || isDestinationPictures) {
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">
              ${destinationDescription}
              </p>
              ${createPhotosTemplate(destinationPictures, isDestinationPictures)}
            </section>`;
  }

  return '';
};

const createDestinationPointTemplate = () => {
  if (CITY_LIST) {
    const result = CITY_LIST.map((city) => (`<option value = "${city}"/>`));

    return `<datalist id = "destination-list-1">
              ${result.join('')}
            </datalist>`;
  }

  return '';
};

const convertDateFormat = (date) => (dayjs(date).format('DD/MM/YY HH:mm'));

const createDateTimeInputTemplate = (dateTo, dateFrom) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDateFormat(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDateFormat(dateTo)}">
  </div>`
);

const createSiteEditTemplate = (point) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers: offersContainer,
    type,
    isDestinationDescription,
    isDestinationPictures,
    isOffers,
  } = point;

  return (`<form class="event event--edit" action="#" method="post">
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
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
      ${createDestinationPointTemplate()}
    </div>

    ${createDateTimeInputTemplate(dateTo, dateFrom)}

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
      ${createOffersListTemplate(offersContainer, isOffers)}
      ${createDestinationDescriptionTemplate(destination, isDestinationDescription, isDestinationPictures)}
  </section>
</form>`);
};

export default class SiteEditView extends SmartView {
  #datepickerDateTo = null;
  #datepickerDateFrom = null;

  constructor(point = BLANK_POINT, offers = {}, destinations = {}) {
    super();
    this._offers = offers;
    this._destinations = destinations;
    this._data = SiteEditView.parsePointToData(point);

    this.#setInnerHandlers();
    this.#setDatepickerDateFrom();
    this.#setDatepickerDateTo();
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__type-label').forEach((item) => item.addEventListener('click', this.#typeTripClickHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
  }

  reset = (point) => {
    this.updateData(
      SiteEditView.parsePointToData(point),
    );
  }

  restoreHandlers = () => {
    this.#setInnerHandlers();
    this.#setDatepickerDateFrom();
    this.#setDatepickerDateTo();
    this.setEditSubmitHandler(this._callback.submit);
    this.setCloseEditClickHandler(this._callback.clickClose);
  }

  get template() {
    return createSiteEditTemplate(this._data);
  }

  #typeTripClickHandler = (evt) => {
    evt.preventDefault();
    const changedValue = evt.target.parentNode.querySelector('input').value;

    this.updateData({
      type: changedValue,
      offers: {
        type: changedValue,
        offers: this._offers.get(changedValue).offers
      }
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateData({
      destination: this._destinations.get(evt.target.value),
    });
  }

  setCloseEditClickHandler = (callback) => {
    this._callback.clickClose = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseClickHandler);
  }

  #editCloseClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.clickClose();
  }

  setEditSubmitHandler = (callback) => {
    this._callback.submit = callback;
    this.element.addEventListener('submit', this.#editSubmitHandler);
  }

  #editSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(SiteEditView.parseDataToPoint(this._data));
  }

  removeEventSubmitHandler = () => {
    this.element.removeEventListener('submit', this.#editSubmitHandler);
  }

  removeEventCloseClickHandler = () => {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editCloseClickHandler);
  }

  #setDatepickerDateFrom = () => {
    this.#datepickerDateFrom  = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        defaultDate: this._data.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._data.dateTo,
      },
    );
  }

  #setDatepickerDateTo = () => {
    this.#datepickerDateTo  = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/Y H:i',
        enableTime: true,
        defaultDate: this._data.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._data.dateFrom,
      },
    );
  }

  #dateFromChangeHandler = ([userDate]) => {
    this.#datepickerDateTo.set('minDate', userDate);

    this.updateData({
      dateFrom: userDate,
    }, true);
  }

  #dateToChangeHandler = ([userDate]) => {
    this.#datepickerDateFrom.set('maxDate', userDate);

    this.updateData({
      dateTo: userDate,
    }, true);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datepickerDateTo) {
      this.#destroyDatepickerDateTo();
    }

    if (this.#datepickerDateFrom) {
      this.#destroyDatepickerDateFrom();
    }
  }

  #destroyDatepickerDateTo = () => {
    this.#datepickerDateTo.destroy();
    this.#datepickerDateTo = null;
  }

  #destroyDatepickerDateFrom = () => {
    this.#datepickerDateFrom.destroy();
    this.#datepickerDateFrom = null;
  }

  static parsePointToData = (point) => ({...point,
    isDestinationDescription: point.destination.description !== '',
    isDestinationPictures: point.destination.pictures.length > 0,
    isOffers: point.offers.offers.length > 0,
  });

  static parseDataToPoint = (data) => {
    const point = {...data};

    if(!point.isDestinationDescription) {
      point.destination.description = null;
    }

    if(!point.isDestinationPictures) {
      point.destination.pictures = null;
    }

    if(!point.isOffers) {
      point.offers = null;
    }

    delete point.isDestinationDescription;
    delete point.isDestinationPictures;
    delete point.isOffers;

    return point;
  }
}
