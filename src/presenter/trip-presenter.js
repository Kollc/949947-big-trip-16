import {
  RenderPosition,
  render,
} from '../utils/render';

import SiteMenuView from '../view/site-menu-view';
import SiteFilterView from '../view/site-filter-view';
import SiteSortView from '../view/site-sort-view';
import SiteListView from '../view/site-list-view';
import SiteEmptyView from '../view/site-empty-view';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/common.js';

const POINT_COUNT = 15;

export default class TripPresenter {
  #points = [];
  #navigationContainerElement = null;
  #filterContainerElement = null;
  #tripSectionElement = null;
  #tripListContainerElement = new SiteListView().element;
  #pointPresenter = new Map();

  constructor(points, navigationContainerElement, filterContainer, tripSectionElement) {
    this.#navigationContainerElement = navigationContainerElement;
    this.#filterContainerElement = filterContainer;
    this.#tripSectionElement = tripSectionElement;
    this.#points = points;

    render(this.#navigationContainerElement, new SiteMenuView(), RenderPosition.BEFOREEND);
    render(this.#filterContainerElement, new SiteFilterView(), RenderPosition.BEFOREEND);

    this.#renderTripContainer();
  }

  #renderTripContainer = () => {
    render(this.#tripSectionElement, new SiteSortView(), RenderPosition.BEFOREEND);
    render(this.#tripSectionElement, this.#tripListContainerElement, RenderPosition.BEFOREEND);
    this.#renderListPoints();
  }

  #handlePointChange = (updatePoint) => {
    this.#points = updateItem(this.#points, updatePoint);
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
    render(this.#tripListContainerElement, new SiteEmptyView(), RenderPosition.BEFOREEND);
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
