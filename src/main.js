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
import SiteMenuView from './view/site-menu-view';
import {MenuItem} from './consts.js';
import { render, RenderPosition, remove } from './utils/render';
import StatisticsView from './view/site-statistics-view';

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripSectionElement = document.querySelector('.trip-events');
let statisticsComponent = null;
const points = getPoints();

const pointsModel = new PointModel();
pointsModel.points = points;

const filterModel = new FilterModel();

const offersModel = new OffersModel();
offersModel.offers = OFFERS_LIST;

const destinationsModel = new DestinationsModel();
destinationsModel.destinations = ALL_DESTINATIONS_LIST;

const siteMenuView = new SiteMenuView();
render(navigationContainerElement, siteMenuView, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripSectionElement, pointsModel, filterModel, offersModel, destinationsModel);
const filterPresenter = new FilterPresenter(filterContainerElement, filterModel, pointsModel);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      filterPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterPresenter.destroy();
      statisticsComponent = new StatisticsView(pointsModel.points);
      render(tripSectionElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};

tripPresenter.init();
filterPresenter.init();
siteMenuView.setMenuClickHandler(handleSiteMenuClick);

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  siteMenuView.element.querySelectorAll('.trip-tabs__btn').forEach((link) => {
    link.disabled = true;
  });
  tripPresenter.createPoint();
});
