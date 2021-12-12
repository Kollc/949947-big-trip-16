import {
  RenderPosition,
  render,
  replace
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

  const closeEditKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      replaceEditFormToPoint();
    }
  };

  pointComponent.setOpenEditClickHandler(() => {
    replacePointToEditForm();
  });

  function replacePointToEditForm() {
    replace(pointEditComponent, pointComponent);

    document.addEventListener('keydown', closeEditKeydownHandler);
    pointEditComponent.setCloseEditClickHandler(() => {
      replaceEditFormToPoint();
    });
    pointEditComponent.setEditSubmitHandler(() => {
      replaceEditFormToPoint();
    });
  }

  function replaceEditFormToPoint() {
    if (pointListElement.contains(pointEditComponent.element)) {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', closeEditKeydownHandler);
      pointEditComponent.removeEventCloseClickHandler();
      pointEditComponent.removeEventSubmitHandler();
    }
  }

  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

const renderListPoints = (container, listPoints) => {
  const tripListContainerElement = new SiteListView().element;
  render(container, tripListContainerElement, RenderPosition.BEFOREEND);

  if (listPoints.length > 0) {
    for (let i = 1; i < POINT_COUNT; i++) {
      renderPoints(tripListContainerElement, listPoints[i]);
    }
  } else {
    render(tripListContainerElement, new SiteEmptyView(), RenderPosition.BEFOREEND);
  }
};

render(navigationContainerElement, new SiteMenuView(), RenderPosition.BEFOREEND);
render(filterContainerElement, new SiteFilterView(), RenderPosition.BEFOREEND);
render(tripSectionElement, new SiteSortView(), RenderPosition.BEFOREEND);

renderListPoints(tripSectionElement, points);
