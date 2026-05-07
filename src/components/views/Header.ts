import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Header extends Component<IHeader> {
  protected basketButton: HTMLButtonElement;
  protected counterElement: HTMLElement;

  constructor(header: HTMLElement, actions: IBasketActions) {
    super(header);
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container
    );
    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );

    if (actions.onBasketOpen) {
      this.basketButton.addEventListener("click", actions.onBasketOpen);
    }
  }

  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}

export interface IHeader {
  counter: number;
}

export interface IBasketActions {
  onBasketOpen(): void;
}
