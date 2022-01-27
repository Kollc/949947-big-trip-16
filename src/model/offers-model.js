import Observer from './../utils/abstract-observable';

export default class OffersModel extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  set offers(offers) {
    this._offers = offers;
  }

  get offers() {
    return this._offers;
  }
}
