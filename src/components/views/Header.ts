import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Класс компонента шапки сайта (header).
 * Наследуется от Component<IHeader> и предоставляет функциональность
 * для отображения кнопки корзины и счетчика товаров в корзине.
 */
export class Header extends Component<IHeader> {
  /** Кнопка открытия корзины */
  protected basketButton: HTMLButtonElement;
  /** Элемент отображения счетчика товаров в корзине */
  protected counterElement: HTMLElement;

  /**
   * Создаёт экземпляр шапки сайта.
   * @param header - корневой DOM-элемент контейнера шапки
   * @param actions - обработчик клика по кнопке корзины
   */
  constructor(header: HTMLElement, actions: IBasketActions) {
    super(header);
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container
    );
    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container
    );

    if (actions.onBasketOpen) {
      this.basketButton.addEventListener("click", actions.onBasketOpen);
    }
  }

  /**
   * Устанавливает отображение счетчика товаров в корзине.
   * @param value - количество товаров в корзине
   */
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}

/**
 * Интерфейс данных шапки сайта.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Header.
 */
interface IHeader {
  /** Количество товаров в корзине */
  counter: number;
}

interface IBasketActions {
  onBasketOpen(): void;
}

