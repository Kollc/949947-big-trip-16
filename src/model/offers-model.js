import Observer from './../utils/abstract-observable';

export default class OffersModel extends Observer {
  constructor() {
    super();
    this._offers = [];
  }

  setOffers(offers) {
    this._offers = offers;
  }

  getOffers() {
    return this._offers;
  }
}
