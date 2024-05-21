export class HydraCollection {
  '@context': string;
  '@id': string;
  '@type' = 'hydra:Collection';
  'hydra:member': Array<any> = [];
  'hydra:totalItems': number;

  // tslint:disable-next-line:typedef
  getTotalItems() {
    return this['hydra:totalItems'];
  }

  // tslint:disable-next-line:typedef
  getMember() {
    return this['hydra:member'];
  }

  getHydraView(): HydraView {
    // @ts-ignore
    return this['hydra:view'];
  }

  // tslint:disable-next-line:typedef
  getContext() {
    return this['@context'];
  }

  // tslint:disable-next-line:typedef
  getId() {
    return this['@id'];
  }

  // tslint:disable-next-line:typedef
  getType() {
    return this['@type'];
  }
}

export class HydraView {
  '@id': string;
  '@type': string;
  'hydra:first': string;
  'hydra:last': string;
  'hydra:next': string;

  // tslint:disable-next-line:typedef
  getId() {
    return this['@id'];
  }

  // tslint:disable-next-line:typedef
  getType() {
    return this['@type'];
  }

  // tslint:disable-next-line:typedef
  getFirst() {
    return this['hydra:first'];
  }

  // tslint:disable-next-line:typedef
  getLast() {
    return this['hydra:last'];
  }

  // tslint:disable-next-line:typedef
  getNext() {
    return this['hydra:next'];
  }
}

export class PartialCollectionView {
  '@id': string;
  '@type': string;

  // tslint:disable-next-line:typedef
  getId() {
    return this['@id'];
  }

  // tslint:disable-next-line:typedef
  getType() {
    return this['@type'];
  }
}
