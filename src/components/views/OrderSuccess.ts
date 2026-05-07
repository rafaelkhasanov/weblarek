import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class OrderSuccess extends Component<IOrderSuccess> {
  private orderSuccessDescription: HTMLElement;
  private orderSuccessButton: HTMLButtonElement;

  constructor(orderSuccess: HTMLElement, actions?: IOrderSuccessActions) {
    super(orderSuccess);
    this.orderSuccessDescription = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container
    );

    this.orderSuccessButton = ensureElement<HTMLButtonElement>(
      ".button",
      this.container
    );

    if (actions?.onOrderSuccessClick) {
      this.orderSuccessButton.addEventListener(
        "click",
        actions.onOrderSuccessClick
      );
    }
  }

  set totalPrice(value: number) {
    this.orderSuccessDescription.textContent = `Списано ${value ?? 0} синапсов`;
  }
}

export interface IOrderSuccess {
  totalPrice: number;
}

export interface IOrderSuccessActions {
  onOrderSuccessClick(): void;
}
