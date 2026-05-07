import { ensureAllElements } from "../../utils/utils";
import { Form, IForm, IFormActions } from "./Form";

const activePaymentClass = "button_alt-active";

/**
 * Класс формы оформления заказа.
 * Наследуется от Form<IOrderForm> и предоставляет функциональность
 * для отображения данных покупателя, выбора способа оплаты и отправки заказа.
 */
export class OrderForm extends Form<IOrderForm> {
  /** Массив кнопок выбора способа оплаты */
  protected altButtons: HTMLButtonElement[];

  /**
   * Создаёт экземпляр формы оформления заказа.
   * @param orderForm - корневой DOM-элемент контейнера формы
   * @param actions - обработчики клика по кнопке оформления и кнопкам способа оплаты
   */
  constructor(orderForm: HTMLFormElement, actions?: IOrderFormActions) {
    super(orderForm, actions);

    this.altButtons = ensureAllElements<HTMLButtonElement>(
      ".button_alt",
      this.container
    );

    if (actions?.onNextClick) {
      this.button.addEventListener("click", actions.onNextClick);
    }

    if (actions?.onPaymentClick) {
      this.altButtons.forEach((button) =>
        button.addEventListener("click", actions.onPaymentClick)
      );
    }
  }

  /**
   * Устанавливает активный способ оплаты.
   * Подсвечивает кнопку выбранного способа оплаты классом button_alt-active.
   * @param value - название способа оплаты или null
   */
  set activePayment(value: string | null) {
    this.altButtons.forEach((button) => {
      if (button.name === value) {
        button.classList.add(activePaymentClass);
      } else {
        button.classList.remove(activePaymentClass);
      }
    });
  }
}

/**
 * Интерфейс данных формы оформления заказа.
 * Расширяет интерфейс IForm и добавляет поле для выбранного способа оплаты.
 */
export interface IOrderForm extends IForm {
  /** Выбранный способ оплаты */
  activePayment: string | null;
}

/**
 * Интерфейс обработчиков событий формы оформления заказа.
 * Расширяет интерфейс IFormActions и добавляет обработчики клика по кнопкам.
 */
export interface IOrderFormActions extends IFormActions {
  /** Обработчик клика по кнопке оформления заказа */
  onNextClick(): void;
  /** Обработчик клика по кнопке выбора способа оплаты */
  onPaymentClick(event: Event): void;
}

