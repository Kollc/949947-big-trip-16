import SiteEditView from '../view/site-edit-view';
import {nanoid} from 'nanoid';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType, IS_NEW_POINT} from './../consts';
import { getNewPoint } from '../utils/common';

export default class PointNewPresenter {
  #pointsListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #offers = null;
  #destinations = null;
  #defaultNewDestinations = null;
  #addNewEventButtonElement = null;

  constructor(pointsListContainer, changeData, addNewEventButtonElement) {
    this.#pointsListContainer = pointsListContainer;
    this.#changeData = changeData;
    this.#addNewEventButtonElement = addNewEventButtonElement;
  }

  init = (offers, destinations) => {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#addNewEventButtonElement.element.disabled = true;

    this.#offers = offers;
    this.#destinations = destinations;
    this.#defaultNewDestinations = this.#getCityForNewPoint();

    this.#pointEditComponent = new SiteEditView(getNewPoint(this.#defaultNewDestinations, []) ,this.#offers, this.#destinations, IS_NEW_POINT);
    this.#pointEditComponent.setEditSubmitHandler(this.#submitFormHandler);
    this.#pointEditComponent.setDeleteClickHandler(this.#clickDeleteHandler);
    render(this.#pointsListContainer, this.#pointEditComponent, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#addNewEventButtonElement.element.disabled = false;
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #getCityForNewPoint = () => {
    for (const cityName of this.#destinations.values()) {
      return cityName;
    }
  }

  setAborting = () => {
    const resetFormState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  #submitFormHandler = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {id: nanoid(), ...point},
    );
  }

  #clickDeleteHandler = () => {
    this.destroy();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  }
}
