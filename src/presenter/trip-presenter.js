import {
  RenderPosition,
  render,
} from '../utils/render';

import SiteMenuView from '../view/site-menu-view';
import SiteFilterView from '../view/site-filter-view';
import SiteSortView from '../view/site-sort-view';
import SiteListView from '../view/site-list-view';
import SiteEditView from '../view/site-empty-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common.js';
import { POINT_COUNT } from '../consts';
import { SortType } from '../consts';
import { sortByTime, sortByPrice } from '../utils/common.js';

export default class TripPresenter {
  #points = [];
  #navigationContainerElement = null;
  #filterContainerElement = null;
  #tripSectionElement = null;
  #tripListContainerElement = new SiteListView().element;
  #pointPresenter = new Map();
  #sortComponent = new SiteSortView();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardPoints = [];

  constructor(points, navigationContainerElement, filterContainer, tripSectionElement) {
    this.#navigationContainerElement = navigationContainerElement;
    this.#filterContainerElement = filterContainer;
    this.#tripSectionElement = tripSectionElement;
    this.#points = points;
    this.#sourcedBoardPoints = [...points];

    render(this.#navigationContainerElement, new SiteMenuView(), RenderPosition.BEFOREEND);
    render(this.#filterContainerElement, new SiteFilterView(), RenderPosition.BEFOREEND);

    this.#renderTripContainer();
  }

  #renderTripContainer = () => {
    this.#renderSort();
    render(this.#tripSectionElement, this.#tripListContainerElement, RenderPosition.BEFOREEND);
    this.#renderListPoints();
  }

  #clickSortTypeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTasks(sortType);
    this.#clearListPoints();
    this.#renderListPoints();
  }

  #clearListPoints = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }

  #sortTasks = (sortType) => {
    switch (sortType) {
      case SortType.BY_TIME:
        this.#points.sort(sortByTime);
        break;
      case SortType.BY_PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderSort = () => {
    render(this.#tripSectionElement, this.#sortComponent, RenderPosition.BEFOREEND);
    this.#sortComponent.setSortTypeChangeHalder(this.#clickSortTypeHandler);
  }

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatePoint);
    this.#pointPresenter.get(updatePoint.id).init(updatePoint);
  }

  #renderPoints = () => {
    for (let i = 1; i < POINT_COUNT; i++) {
      this.#renderPoint(this.#tripListContainerElement, this.#points[i]);
    }
  }

  #renderListPoints = () => {
    if (this.#points.length > 0) {
      this.#renderPoints();
    } else {
      this.#renderNoPoints();
    }
  }

  #renderNoPoints = () => {
    render(this.#tripListContainerElement, new SiteEditView(), RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #renderPoint = (container, point) => {
    const pointPresenter =  new PointPresenter(container, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
