import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Абстрактный базовый класс для карточек товаров.
 * Наследуется от Component<T> и предоставляет базовую функциональность
 * для отображения названия и цены товара.
 */
export abstract class Card<T> extends Component<T> {
  /** Элемент отображения названия товара */
  protected titleElement: HTMLElement;
  /** Элемент отображения цены товара */
  protected priceElement: HTMLElement;

  /**
   * Создаёт экземпляр карточки товара.
   * @param card - корневой DOM-элемент контейнера карточки
   */
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
  }

  /**
   * Устанавливает отображение названия товара.
   * @param value - название товара для отображения
   */
  set title(value: string) {
    this.titleElement.textContent = value;
  }

  /**
   * Устанавливает отображение цены товара.
   * Если значение null или undefined, отображается 0.
   * @param value - цена товара в синапсах
   */
  set price(value: number | null) {
    this.priceElement.textContent = `${value ?? 0} синапсов`;
  }
}