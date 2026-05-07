import { Component } from "../base/Component";

export class Gallery extends Component<IGalery> {
  constructor(catalogElement: HTMLElement) {
    super(catalogElement);
  }

  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}

export interface IGalery {
  catalog: HTMLElement[];
}
