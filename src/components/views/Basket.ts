import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Basket extends Component<IBasket> {
  protected basketList: HTMLUListElement;
  protected orderButton: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(basket: HTMLElement, actions?: IBasketActions) {
    super(basket);
    this.basketList = ensureElement<HTMLUListElement>(
      ".basket__list",
      this.container
    );
    this.orderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );

    if (actions?.onOrderClick) {
      this.orderButton.addEventListener("click", actions.onOrderClick);
    }
  }

  set basketItems(value: HTMLElement[]) {
    this.orderButton.disabled = value.length < 1;
    this.basketList.replaceChildren(...value);
  }

  set price(value: number) {
    this.priceElement.textContent = `${value ?? 0} синапсов`;
  }
}

export interface IBasket {
  basketItems: HTMLElement[];
  price: number;
}

export interface IBasketActions {
  onOrderClick(): void;
}
