import { ensureElement } from "../../utils/utils";
import { Card, ICard, ICardActions } from "./Card";

export class CardBasket extends Card<ICardBasket> {
  protected deleteButton: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(cardBasket: HTMLLIElement, actions?: ICardActions) {
    super(cardBasket);

    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container
    );

    this.indexElement = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container
    );

    if (actions?.onClick) {
      this.deleteButton.addEventListener("click", actions.onClick);
    }
  }

  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}

export interface ICardBasket extends ICard {
  index: number;
}
