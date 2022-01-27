import SiteEditView from '../view/site-edit-view';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType, DEFAULT_TYPE} from './../consts';
import { getNewPoint } from '../utils/common';

export default class PointNewPresenter {
  #pointsListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #offersModel = null;
  #destinationsModel = null;
  #defaultNewOffers = null;
  #defaultNewDestinations = null;

  constructor(pointsListContainer, changeData, offersModel, destinationsModel) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#defaultNewOffers = this.#offersModel.getOffers().get(DEFAULT_TYPE);
    this.#defaultNewDestinations = this.#getCityForNewPoint();
  }

  init = () => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new SiteEditView(getNewPoint(this.#defaultNewDestinations, this.#defaultNewOffers) ,this.#offersModel.getOffers(), this.#destinationsModel.getDestinations());
    this.#pointEditComponent.setEditSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointsListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #getCityForNewPoint = () => {
    for (const cityName of this.#destinationsModel.getDestinations().values()) {
      return cityName;
    }
  }

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  }

  #handleDeleteClick = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
