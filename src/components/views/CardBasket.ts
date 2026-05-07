import { ensureElement } from "../../utils/utils";
import { Card, CardData, ICardActions } from "./Card";

/**
 * Класс карточки товара в корзине покупателя.
 * Наследуется от абстрактного класса Card<CardBasketData> и предоставляет
 * функциональность для отображения позиции товара в корзине и кнопки удаления.
 */
export class CardBasket extends Card<CardBasketData> {
  /** Кнопка удаления товара из корзины */
  protected deleteButton: HTMLButtonElement;
  /** Элемент отображения номера позиции товара в корзине */
  protected indexElement: HTMLElement;

  /**
   * Создаёт экземпляр карточки товара в корзине.
   * @param cardBasket - корневой DOM-элемент LI контейнера карточки
   * @param actions - обработчик клика по кнопке удаления
   */
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

  /**
   * Устанавливает отображение номера позиции товара в корзине.
   * @param value - номер позиции товара (начиная с 1)
   */
  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}

/**
 * Тип данных карточки товара в корзине.
 * Расширяет базовый тип CardData и добавляет поле номера позиции.
 */
export type CardBasketData = CardData & { index: number };

