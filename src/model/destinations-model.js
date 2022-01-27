import Observer from './../utils/abstract-observable';

export default class DestinationsModel extends Observer {
  constructor() {
    super();
    this._destinations = [];
  }

  set destinations(destinations) {
    this._destinations = destinations;
  }

  get destinations() {
    return this._destinations;
  }
}
