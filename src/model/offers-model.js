import Observer from './../utils/abstract-observable';

export default class OffersModel extends Observer {
  #apiService  = null;

  constructor(apiService) {
    super();
    this._offers = new Map();
    this.#apiService = apiService;
  }

  getOffers = async () => {
    try {
      const offers = await this.#apiService.offers;
      this._offers = this.#adaptToClient(offers);
    } catch(err) {
      this._offers = [];
    }

    return this._offers;
  }

  #adaptToClient = (offers) => {
    const adaptedOffers = new Map();
    offers.map((offer) => {
      adaptedOffers.set(offer.type, offer.offers);
    });

    return adaptedOffers;
  }
}
