import { categoryMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card, ICard, ICardActions } from "./Card";

type CategoryKey = keyof typeof categoryMap;

/**
 * Класс карточки товара в каталоге.
 * Наследуется от абстрактного класса Card<ICardCatalog> и предоставляет
 * функциональность для отображения изображения, категории и названия товара.
 */
export class CardCatalog extends Card<ICardCatalog> {
  /** Элемент отображения изображения товара */
  protected imageElement: HTMLImageElement;
  /** Элемент отображения категории товара */
  protected categoryElement: HTMLElement;

  /**
   * Создаёт экземпляр карточки товара в каталоге.
   * @param cardCatalog - корневой DOM-элемент контейнера карточки
   * @param actions - обработчик клика по карточке
   */
  constructor(cardCatalog: HTMLElement, actions?: ICardActions) {
    super(cardCatalog);
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container
    );

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }
  }

  /**
   * Устанавливает отображение категории товара.
   * Также добавляет соответствующий CSS-класс для стилизации категории.
   * @param value - название категории товара
   */
  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value
      );
    }
  }

  /**
   * Устанавливает отображение изображения товара.
   * Использует утилитарный метод setImage для установки источника и альтернативного текста.
   * @param value - URL изображения товара
   */
  set image(value: string) {
    this.setImage(this.imageElement, value, this.title);
  }
}

/**
 * Интерфейс данных карточки товара в каталоге.
 * Расширяет интерфейс ICard и добавляет поля для категории и изображения.
 */
export interface ICardCatalog extends ICard {
  /** Категория товара */
  category: string;
  /** URL изображения товара */
  image: string;
}

