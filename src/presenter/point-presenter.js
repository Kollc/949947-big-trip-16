import SiteEditView from '../view/site-edit-view';
import SitePointView from '../view/site-point-view';
import {
  replace,
  RenderPosition,
  render,
  remove,
} from '../utils/render';

import { Mode , UserAction, UpdateType } from '../consts';
import { allDestinitions, allOffers } from '../mock/point';

export default class PointPresenter {
  #pointComponent = null;;
  #pointEditComponent = null;;
  #container = null;
  #changeData = null;
  #point = null;
  #changeMode = null;
  #mode = Mode.DEFAULT

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    const pointComponent = this.#pointComponent;
    const pointEditComponent = this.#pointEditComponent;

    this.#point = point;
    this.#pointComponent = new SitePointView(this.#point);
    this.#pointEditComponent = new SiteEditView(this.#point, allOffers(), allDestinitions());

    this.#pointComponent.setOpenEditClickHandler(this.#openEditClickHandler);
    this.#pointComponent.setAddFavoriteClickHandler(this.#addFavoriteClickHandler);
    this.#pointEditComponent.setDeleteClickHandler(this.#deleteClickHandler);

    if (pointComponent === null || pointEditComponent === null) {
      this.#renderPoint();
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, pointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, pointEditComponent);
    }

    remove(pointComponent);
    remove(pointEditComponent);
  }

  #renderPoint = () => {
    render(this.#container, this.#pointComponent, RenderPosition.BEFOREEND);
  }

  #closeEditKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #openEditClickHandler = () => {
    this.#replacePointToEditForm();
  }

  #addFavoriteClickHandler = () => {
    const updatePoint = {...this.#point, isFavorite: !this.#point.isFavorite};
    this.#changeData(UserAction.UPDATE_POINT, UpdateType.PATCH, updatePoint);
  }

  #deleteClickHandler = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  }

  #editSubmitHandler = (point) => {
    this.#changeData(UserAction.UPDATE_POINT, UpdateType.MINOR, point);
    this.#replaceEditFormToPoint();
  }

  #replacePointToEditForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);

    document.addEventListener('keydown', this.#closeEditKeydownHandler);

    this.#pointEditComponent.setCloseEditClickHandler(() => {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    });

    this.#pointEditComponent.setEditSubmitHandler(this.#editSubmitHandler);

    this.#changeMode();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToPoint = () => {
    if (this.#container.contains(this.#pointEditComponent.element)) {
      replace(this.#pointComponent, this.#pointEditComponent);
      document.removeEventListener('keydown', this.#closeEditKeydownHandler);
      this.#pointEditComponent.removeEventCloseClickHandler();
      this.#pointEditComponent.removeEventSubmitHandler();
      this.#mode = Mode.DEFAULT;
    }
  }
}
