import {
  RenderPosition,
  render
} from './utils/render';

import {
  getPoints
} from './mock/point';

import SiteMenuView from './view/site-menu-view';
import SiteFilterView from './view/site-filter-view';
import SiteEditView from './view/site-edit-view';
import SitePointView from './view/site-point-view';
import SiteSortView from './view/site-sort-view';
import SiteListView from './view/site-list-view';
import SiteEmptyView from './view/site-empty-view';

const POINT_COUNT = 15;
const points = getPoints();

const navigationContainerElement = document.querySelector('.trip-controls__navigation');
const filterContainerElement = document.querySelector('.trip-controls__filters');
const tripSectionElement = document.querySelector('.trip-events');

const renderPoints = (pointListElement, point) => {
  const pointComponent = new SitePointView(point);
  const pointEditComponent = new SiteEditView(point);

  const buttonCloseElement = pointEditComponent.element.querySelector('.event__rollup-btn');
  const buttonOpenElement = pointComponent.element.querySelector('.event__rollup-btn');

  const replacePointToEditForm = () => {
    pointListElement.replaceChild(pointEditComponent.element, pointComponent.element);
  };

  const replaceEditFormToPoint = () => {
    if (pointListElement.contains(pointEditComponent.element)) {
      pointListElement.replaceChild(pointComponent.element, pointEditComponent.element);
    }
  };

  const openEditClickHandler = () => {
    replacePointToEditForm();
  };

  const editSubmitHandler = (evt) => {
    evt.preventDefault();
    replaceEditFormToPoint();
  };

  const closeEditKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      replaceEditFormToPoint();
    }
  };

  const closeEditClickHandler = () => {
    replaceEditFormToPoint();
  };

  buttonOpenElement.addEventListener('click', openEditClickHandler);
  pointEditComponent.element.addEventListener('submit', editSubmitHandler);
  document.addEventListener('keydown', closeEditKeydownHandler);
  buttonCloseElement.addEventListener('click', closeEditClickHandler);

  render(pointListElement, pointComponent.element, RenderPosition.BEFOREEND);
};

const renderListPoints = (container, listPoints) => {
  const tripListContainerElement = new SiteListView().element;
  render(container, tripListContainerElement, RenderPosition.BEFOREEND);

  if (listPoints.length > 0) {
    for (let i = 1; i < POINT_COUNT; i++) {
      renderPoints(tripListContainerElement, listPoints[i]);
    }
  } else {
    render(tripListContainerElement, new SiteEmptyView().element, RenderPosition.BEFOREEND);
  }
};

render(navigationContainerElement, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(filterContainerElement, new SiteFilterView().element, RenderPosition.BEFOREEND);
render(tripSectionElement, new SiteSortView().element, RenderPosition.BEFOREEND);

renderListPoints(tripSectionElement, points);
