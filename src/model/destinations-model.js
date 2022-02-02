import Observer from './../utils/abstract-observable';

export default class DestinationsModel extends Observer {
  #apiService = null;

  constructor(apiService) {
    super();
    this._destinations =   new Map();
    this.#apiService = apiService;
  }

  getDestination = async () => {
    try {
      const destinations = await this.#apiService.destinations;
      this._destinations = this.#adaptToClient(destinations);
    } catch(err) {
      this.destinations = [];
    }

    return  this._destinations;
  }

  #adaptToClient = (destinations) => {
    const adaptedDestinations = new Map();
    destinations.map((destination) => {
      adaptedDestinations.set(destination.name, destination);
    });

    return adaptedDestinations;
  }
}
