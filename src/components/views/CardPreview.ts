import { IProduct } from "../../types";
import { categoryMap, productBuyStateMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICardActions } from "./Card";

type CategoryKey = keyof typeof categoryMap;
export type ProductBuyStateKey = keyof typeof productBuyStateMap;

export class CardPreview extends Card<ICardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected descriptionElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(cardPreview: HTMLElement, actions?: ICardActions) {
    super(cardPreview);
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    this.descriptionElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container
    );

    this.cardButton = ensureElement<HTMLButtonElement>(
      ".button",
      this.container
    );

    if (actions?.onClick) {
      this.cardButton.addEventListener("click", actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }

  set buyState(value: ProductBuyStateKey) {
    this.cardButton.disabled = value === "notAvailable";
    this.cardButton.textContent = productBuyStateMap[value];
  }
}

export interface ICardPreview extends IProduct {
  buyState: ProductBuyStateKey;
}
