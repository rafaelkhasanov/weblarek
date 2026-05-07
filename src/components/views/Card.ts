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
    this.title = this.titleElement.textContent ?? "";
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

/**
 * Интерфейс данных карточки товара.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Card.
 */
export interface ICard {
  /** Название товара */
  title: string;
  /** Цена товара */
  price: number;
}

/**
 * Интерфейс обработчиков событий карточки.
 * Содержит callback-функции для обработки пользовательских действий.
 */
export interface ICardActions {
  /** Обработчик клика по карточке */
  onClick(event: Event): void;
}

