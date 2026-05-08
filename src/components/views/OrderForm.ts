import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Form, FormData } from "./Form";

const activePaymentClass = "button_alt-active";

/**
 * Класс формы оформления заказа.
 * Наследуется от Form<OrderFormData> и предоставляет функциональность
 * для отображения данных покупателя, выбора способа оплаты и отправки заказа.
 */
export class OrderForm extends Form<OrderFormData> {
  /** Массив кнопок выбора способа оплаты */
  protected altButtons: HTMLButtonElement[];
  /** Поле ввода адреса */
  protected addressInput: HTMLInputElement;

  /**
   * Создаёт экземпляр формы оформления заказа.
   * @param orderForm - корневой DOM-элемент контейнера формы
   * @param actions - обработчики клика по кнопке оформления, оплаты и изменению адреса
   */
  constructor(orderForm: HTMLFormElement, actions?: IOrderFormActions) {
    super(orderForm);

    this.altButtons = ensureAllElements<HTMLButtonElement>(
      ".button_alt",
      this.container
    );

    this.addressInput = ensureElement<HTMLInputElement>(
        'input[name="address"]',
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

    if (actions?.onAddressChange) {
      this.addressInput.addEventListener("input", actions.onAddressChange);
    }
  }

  /**
   * Устанавливает активный способ оплаты.
   * Подсвечивает кнопку выбранного способа оплаты классом button_alt-active.
   * @param value - название способа оплаты или null
   */
  set payment(value: string | null) {
    this.altButtons.forEach((button) => {
      if (button.name === value) {
        button.classList.add(activePaymentClass);
      } else {
        button.classList.remove(activePaymentClass);
      }
    });
  }

/**
   * Устанавливает значение поля адреса.
   * @param value - значение адреса
 */
  set address(value: string) {
    this.addressInput.value = value;
  }
}

/**
 * Тип данных формы оформления заказа.
 * Содержит способ оплаты, адрес и ошибки валидации.
 */
export type OrderFormData = {
  payment: string | null;
  address: string;
} & FormData;

/**
 * Интерфейс обработчиков событий формы оформления заказа.
 * Содержит обработчики клика по кнопкам и изменения поля адреса.
 */
export interface IOrderFormActions {
  /** Обработчик клика по кнопке оформления заказа */
  onNextClick(): void;
  /** Обработчик клика по кнопке выбора способа оплаты */
  onPaymentClick(event: Event): void;
  /** Обработчик изменения поля адреса */
  onAddressChange(event: Event): void;
}

