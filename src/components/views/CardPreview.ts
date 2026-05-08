import { ICardActions, IProduct } from "../../types";
import { categoryMap, productBuyStateMap } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { Card } from "./Card";

type CategoryKey = keyof typeof categoryMap;

/**
 * Тип ключа состояния покупки товара.
 * Описывает возможные состояния кнопки покупки: доступна, недоступна, добавлена.
 */
export type ProductBuyStateKey = keyof typeof productBuyStateMap;

/**
 * Класс превью карточки товара (для просмотра деталей).
 * Наследуется от абстрактного класса Card<CardPreviewData> и предоставляет
 * функциональность для отображения изображения, категории, описания и кнопки покупки.
 */
export class CardPreview extends Card<CardPreviewData> {
  /** Элемент отображения изображения товара */
  protected imageElement: HTMLImageElement;
  /** Элемент отображения категории товара */
  protected categoryElement: HTMLElement;
  /** Элемент отображения описания товара */
  protected descriptionElement: HTMLElement;
  /** Кнопка добавления товара в корзину */
  protected cardButton: HTMLButtonElement;

  /**
   * Создаёт экземпляр превью карточки товара.
   * @param cardPreview - корневой DOM-элемент контейнера карточки
   * @param actions - обработчик клика по кнопке покупки
   */
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
   * Устанавливает отображение описания товара.
   * @param value - описание товара
   */
  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  /**
   * Устанавливает отображение изображения товара.
   * Использует утилитарный метод setImage для установки источника и альтернативного текста.
   * @param value - URL изображения товара
   */
  set image(value: string) {
    this.setImage(this.imageElement, value);
  }

  /**
   * Устанавливает состояние кнопки покупки.
   * Если состояние 'notAvailable', кнопка блокируется.
   * Также обновляет текст кнопки в соответствии с состоянием.
   * @param value - ключ состояния покупки
   */
  set buyState(value: ProductBuyStateKey) {
    this.cardButton.disabled = value === "notAvailable";
    this.cardButton.textContent = productBuyStateMap[value];
  }
}

/**
 * Тип данных превью карточки товара.
 * Содержит все поля из интерфейса IProduct и добавляет поле состояния покупки.
 * Используется для передачи данных в компонент CardPreview.
 */
type CardPreviewData = IProduct & { buyState: ProductBuyStateKey };

