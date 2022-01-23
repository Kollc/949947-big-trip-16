import {
  getPoints
} from './mock/point';

import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter.js';

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripSectionElement = document.querySelector('.trip-events');
const points = getPoints();

const pointsModel = new PointModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(navigationContainerElement, tripSectionElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainerElement, filterModel, pointsModel);

tripPresenter.init();
filterPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});
