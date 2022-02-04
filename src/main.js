import TripPresenter from './presenter/trip-presenter';
import PointModel from './model/points-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter.js';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import SiteMenuView from './view/site-menu-view';
import {AUTHORIZATION, END_POINT, MenuItem} from './consts.js';
import { render, RenderPosition, remove } from './utils/render';
import StatisticsView from './view/site-statistics-view';
import ApiService from './api-service.js';
import SiteButtonNewEventView from './view/site-button-new-evet-view';


const navigationContainerElement = document.querySelector('.trip-controls__navigation');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripSectionElement = document.querySelector('.trip-events');
const tripMainMenuWrapper = document.querySelector('.trip-main');

const addNewEventButtonElement = new SiteButtonNewEventView();
render(tripMainMenuWrapper, addNewEventButtonElement, RenderPosition.BEFOREEND);
addNewEventButtonElement.element.disabled = true;

let statisticsComponent = null;
addNewEventButtonElement.disabled = true;

const offersModel = new OffersModel(new ApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new ApiService(END_POINT, AUTHORIZATION));


const pointsModel = new PointModel(new ApiService(END_POINT, AUTHORIZATION));
pointsModel.init();

const filterModel = new FilterModel();

const siteMenuView = new SiteMenuView();
render(navigationContainerElement, siteMenuView, RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter(tripSectionElement, pointsModel, filterModel, offersModel, destinationsModel, addNewEventButtonElement);
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

addNewEventButtonElement.element.addEventListener('click', (evt) => {
  evt.preventDefault();
  siteMenuView.element.querySelectorAll('.trip-tabs__btn').forEach((link) => {
    link.disabled = true;
  });
  tripPresenter.createPoint();
});
