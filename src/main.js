import {
  getPoints
} from './mock/point';

import TripPresenter from './presenter/trip-presenter';

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripSectionElement = document.querySelector('.trip-events');

new TripPresenter(getPoints(), navigationContainerElement, filterContainerElement, tripSectionElement);
