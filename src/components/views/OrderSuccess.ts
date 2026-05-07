import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Класс сообщения об успешном оформлении заказа.
 * Наследуется от Component<IOrderSuccess> и отображает информацию
 * об успешно выполненном заказе и сумму списанных синапсов.
 */
export class OrderSuccess extends Component<IOrderSuccess> {
  /** Элемент отображения описания успеха заказа */
  private orderSuccessDescription: HTMLElement;
  /** Кнопка закрытия сообщения об успехе */
  private orderSuccessButton: HTMLButtonElement;

  /**
   * Создаёт экземпляр сообщения об успешном заказе.
   * @param orderSuccess - корневой DOM-элемент контейнера сообщения
   * @param actions - обработчик клика по кнопке закрытия
   */
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

  /**
   * Устанавливает отображение информации об успешном заказе.
   * Формирует сообщение с указанием суммы списанных синапсов.
   * @param value - общая сумма заказа в синапсах
   */
  set totalPrice(value: number) {
    this.orderSuccessDescription.textContent = `Списано ${value ?? 0} синапсов`;
  }
}

/**
 * Интерфейс обработчиков событий сообщения об успешном заказе.
 * Содержит callback-функции для обработки событий.
 */
export interface IOrderSuccessActions {
  /** Обработчик клика по кнопке закрытия сообщения */
  onOrderSuccessClick(): void;
}

/**
 * Интерфейс данных сообщения об успешном заказе.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте OrderSuccess.
 */
export interface IOrderSuccess {
  /** Общая сумма заказа в синапсах */
  totalPrice: number;
}

