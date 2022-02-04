import dayjs from 'dayjs';

import {
  capitalize
} from './../utils/capitalize';

import {
  POINT_TYPE_LIST,
} from './../consts.js';

import SmartView from './site-smart-view';

import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { changeInMapTitleToKey } from '../utils/common';

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

const createOffersListTemplate = (offersPoint, offersList, isDisabled) => {
  const offersAll = changeInMapTitleToKey(offersList);
  const offersChecked = changeInMapTitleToKey(offersPoint);

  if (offersList && offersList.length > 0) {
    const result = [];

    offersAll.forEach(({id, price}, title) => {
      result.push(`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" value="${title}" type="checkbox" name="event-offer-${title}" ${offersChecked.has(title) ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
          <label class="event__offer-label" for="event-offer-${title}-${id}">
            <span class="event__offer-title">${he.encode(title)}</span>
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

const createPhotosTemplate = (pictures) => {
  if (pictures && pictures.length > 0) {
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

const createDestinationDescriptionTemplate = (destination, isDestinationDescription) => {
  const destinationDescription = destination.description ? destination.description : '';
  const destinationPictures = destination.pictures ? destination.pictures : [];

  if (isDestinationDescription  || (destinationPictures && destinationPictures.length > 0)) {
    return `<section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">
              ${destinationDescription}
              </p>
              ${createPhotosTemplate(destinationPictures)}
            </section>`;
  }

  return '';
};

const createDestinationPointTemplate = (citiesList) => {
  if (citiesList && citiesList.length > 0) {
    const result = citiesList.map((city) => (`<option value = "${city}"/>`));

    return `<datalist id = "destination-list-1">
              ${result.join('')}
            </datalist>`;
  }

  return '';
};

const convertDateFormat = (date) => (dayjs(date).format('DD/MM/YY HH:mm'));

const createDateTimeInputTemplate = (dateTo, dateFrom, isDisabled) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertDateFormat(dateFrom)}" ${isDisabled ? 'disabled' : ''}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertDateFormat(dateTo)}" ${isDisabled ? 'disabled' : ''}>
  </div>`
);

const createSiteEditTemplate = (point, offersList, citiesList, isNewPoint) => {
  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    offers: offersPoint,
    type,
    isDestinationDescription,
    isDeleting,
    isSaving,
    isDisabled
  } = point;

  return (`<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
      ${createEventTypeListTemplate()}
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1" autocomplete="on" ${isDisabled ? 'disabled' : ''} />
      ${createDestinationPointTemplate(citiesList)}
    </div>

    ${createDateTimeInputTemplate(dateTo, dateFrom, isDisabled)}

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" min="1" name="event-price" value="${basePrice}" ${isDisabled ? 'disabled' : ''}>
    </div>

    ${isNewPoint
      ?
      `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
       <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Cancel...' : 'Cancel'}</button>`
      :
      `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>${isSaving ? 'Saving...' : 'Save'}</button>
       <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>

       <button class="event__rollup-btn" type="button">
         <span class="visually-hidden">Open event</span>
       </button>`
    }

  </header>
  <section class="event__details">
      ${createOffersListTemplate(offersPoint, offersList, isDisabled)}
      ${createDestinationDescriptionTemplate(destination, isDestinationDescription)}
  </section>
</form>`);
};

export default class SiteEditView extends SmartView {
  #datepickerDateTo = null;
  #datepickerDateFrom = null;
  #destinationName = null;
  #citiesList = null;
  #isNewPoint = null;

  constructor(point, offers, destinations, isNewPoint = false) {
    super();
    this._offers = offers;
    this._destinations = destinations;
    this._data = SiteEditView.parsePointToData(point);
    this.#citiesList = [...this._destinations.keys()];
    this.#isNewPoint = isNewPoint;
    this.#destinationName = this._data.destination.name;

    this.#setInnerHandlers();
    this.#setDatepickerDateFrom();
    this.#setDatepickerDateTo();
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.event__offer-selector input').forEach((item) => item.addEventListener('change', this.#offerChangeHandler));
    this.element.querySelectorAll('.event__type-label').forEach((item) => item.addEventListener('click', this.#typeTripClickHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#basePriceChangeHandler);
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
    this.setDeleteClickHandler(this._callback.deleteClick);

    if(!this.#isNewPoint) {
      this.setCloseEditClickHandler(this._callback.clickClose);
    }
  }

  get template() {
    const offersListPoint = this._offers.get(this._data.type);
    return createSiteEditTemplate(this._data, offersListPoint , this.#citiesList, this.#isNewPoint);
  }

  #typeTripClickHandler = (evt) => {
    evt.preventDefault();
    const changedValue = evt.target.parentNode.querySelector('input').value;

    this.updateData({
      type: changedValue,
      offers: [],
    });
  }

  #offerChangeHandler = (evt) => {
    evt.preventDefault();

    const changedValue = evt.target.value;
    const currentOffers = changeInMapTitleToKey(this._data.offers);
    const originOffers = changeInMapTitleToKey(this._offers.get(this._data.type));
    const newOffersList = [];

    if(!evt.target.checked) {
      currentOffers.delete(changedValue);
    } else {
      currentOffers.set(changedValue, originOffers.get(changedValue));
    }

    currentOffers.forEach(({id, price}, title) => {
      const element = {id, title, price};
      newOffersList.push(element);
    });

    this.updateData({
      offers: newOffersList,
    });
  }

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();

    const regexStringCity = [...this.#citiesList].join('|');
    if(evt.target.value.match(regexStringCity)) {
      this.#destinationName = evt.target.value;
    } else {
      evt.target.value = '';
    }

    this.updateData({
      destination: this._destinations.get(this.#destinationName),
    });
  }

  #basePriceChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateData({
      basePrice: evt.target.value,
    }, true);
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

  setDeleteClickHandler = (callback) => {
    this._callback.deleteClick = callback;
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.deleteClick(SiteEditView.parseDataToPoint(this._data));
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
    isDisabled: false,
    isSaving: false,
    isDeleting: false,
  });

  static parseDataToPoint = (data) => {
    const point = {...data};

    if(!point.isDestinationDescription) {
      point.destination.description = null;
    }

    delete point.isDestinationDescription;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
