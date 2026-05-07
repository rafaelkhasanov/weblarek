import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export abstract class Card<T> extends Component<T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;

  constructor(card: HTMLElement) {
    super(card);
    this.titleElement = ensureElement<HTMLElement>(
      ".card__title",
      this.container
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".card__price",
      this.container
    );
    this.title = this.titleElement.textContent ?? "";
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set price(value: number | null) {
    this.priceElement.textContent = `${value ?? 0} синапсов`;
  }
}

export interface ICard {
  title: string;
  price: number;
}

export interface ICardActions {
  onClick(event: Event): void;
}
