import {
  RenderPosition,
  render,
  remove,
} from './../utils/render';

import SiteSortView from './../view/site-sort-view';
import SiteListView from './../view/site-list-view';
import SiteEmptyView from './../view/site-empty-view';
import PointPresenter from './point-presenter';
import { POINT_COUNT, State } from './../consts';
import { SortType } from './../consts';
import { sortByTime, sortByPrice } from './../utils/common';
import { UpdateType, UserAction, FilterType} from './../consts';
import { filter } from './../utils/filter';
import PointNewPresenter from './point-new-presenter';
import SiteLoadingView from './../view/site-loading-view';

export default class TripPresenter {
  #tripSectionElement = null;
  #tripListContainerElement = new SiteListView().element;
  #pointPresenter = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;
  #pointsModel = null;
  #noPointsComponent = null;
  #renderedPointsCount = null;
  #filterModel = null;
  #filterType = FilterType.EVERYTHING;
  #pointNewPresenter = null;
  #loadingComponent = new SiteLoadingView();
  #isLoading = true;
  #offersModel = null;
  #offers = null;
  #destinationsModel = null;
  #destinations = null;
  #addNewEventButtonElement = null;

  constructor(tripSectionElement, pointsModel, filterModel, offersModel, destinationsModel, addNewEventButtonElement) {
    this.#tripSectionElement = tripSectionElement;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#addNewEventButtonElement = addNewEventButtonElement;

    this.#pointNewPresenter = new PointNewPresenter(this.#tripListContainerElement, this.#handleViewAction);
  }

  #handleViewAction = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setViewState(State.SAVING);
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(State.ABORTING);
        }
        break;
      case UserAction.ADD_POINT:
        this.#pointNewPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#pointNewPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setViewState(State.DELETING);
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setViewState(State.ABORTING);
        }
        break;
    }
  }

  createPoint = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#pointNewPresenter.init(this.#offers, this.#destinations);
  }

  #handleModelEvent = async (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTripContainer();
        this.#renderTripContainer();
        break;
      case UpdateType.MAJOR:
        this.#clearTripContainer({resetRenderedPointsCount: true, resetSortType: true});
        this.#renderTripContainer();
        break;
      case UpdateType.INIT:
        await this.#offersModel.getOffers().then((offers) => {
          this.#offers = offers;
        });

        await this.#destinationsModel.getDestination().then((destinations) => {
          this.#destinations = destinations;
        });

        this.#isLoading = false;
        this.#addNewEventButtonElement.element.disabled = false;
        remove(this.#loadingComponent);
        this.#renderTripContainer();
        break;
    }
  }

  init = () => {
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#offersModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#renderTripContainer();
  }

  destroy = () => {
    this.#clearTripContainer({resetRenderedTaskCount: true, resetSortType: true});
    this.#pointsModel.removeObserver(this.#handleModelEvent);
    this.#offersModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.BY_TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.BY_PRICE:
        return filteredPoints.sort(sortByPrice);
    }

    return filteredPoints;
  }

  #renderLoading = () => {
    render(this.#tripSectionElement, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripContainer = () => {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    this.#renderSort();
    this.#renderListPoints();
  }

  #clearTripContainer = ({resetRenderedPointsCount = false, resetSortType = false} = {}) => {
    const pointsCount = this.points.length;

    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#noPointsComponent) {
      remove(this.#noPointsComponent);
    }

    if (resetRenderedPointsCount) {
      this.#renderedPointsCount = POINT_COUNT;
    } else {
      this.#renderedPointsCount = Math.min(pointsCount, this.#renderedPointsCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #clickSortTypeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripContainer({resetRenderedPointsCount: true});
    this.#renderTripContainer();
  }

  #renderSort = () => {
    this.#sortComponent = new SiteSortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHalder(this.#clickSortTypeHandler);
    render(this.#tripSectionElement, this.#sortComponent, RenderPosition.BEFOREEND);
  }

  #renderPoints = (points) => {
    points.forEach((point) => this.#renderPoint(point));
  }

  #renderListPoints = () => {
    const pointsCount = this.points.length;
    render(this.#tripSectionElement, this.#tripListContainerElement, RenderPosition.BEFOREEND);

    if (pointsCount> 0) {
      const points = this.points.slice(0, Math.min(pointsCount, POINT_COUNT));
      this.#renderPoints(points);
    } else {
      this.#renderNoPoints();
    }
  }

  #renderNoPoints = () => {
    this.#noPointsComponent = new SiteEmptyView(this.#filterType);
    render(this.#tripSectionElement, this.#noPointsComponent, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #renderPoint = (point) => {
    const pointPresenter =  new PointPresenter(this.#tripListContainerElement, this.#handleViewAction, this.#handleModeChange, this.#offers, this.#destinations);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  }
}
