import {
  getPoints
} from './mock/point';

import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter.js';
import OffersModel from './model/offers-model';
import { OFFERS_LIST, ALL_DESTINATIONS_LIST } from './mock/point';
import DestinationsModel from './model/destinations-model';

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripSectionElement = document.querySelector('.trip-events');
const points = getPoints();

const pointsModel = new PointModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const offersModel = new OffersModel();
offersModel.setOffers(OFFERS_LIST);

const destinationsModel = new DestinationsModel();
destinationsModel.setDestinations(ALL_DESTINATIONS_LIST);

const tripPresenter = new TripPresenter(navigationContainerElement, tripSectionElement, pointsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(filterContainerElement, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
