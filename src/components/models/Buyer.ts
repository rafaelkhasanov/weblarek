
  /** Получение всех данных покупателя */
import { IBuyer, TPayment } from "../../types";
import { IEvents } from "../base/Events";

type BuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Buyer implements IBuyer {
  private _payment: TPayment | null = null;
  private _email = '';
  private _phone = '';
  private _address = '';
  private _events: IEvents;

  constructor(events: IEvents) {
    this._events = events;
  }

  get payment(): TPayment | null {
    return this._payment;
  }
  set payment(value: TPayment) {
    this._payment = value;
    this._events.emit("buyer:payment-change");
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
    this._events.emit("buyer:email-change");
  }

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
    this._events.emit("buyer:phone-change");
  }

  get address(): string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
    this._events.emit("buyer:address-change");
  }

  /** Очистка данных покупателя */
  clear(): void {
    this._payment = null;
    this._email = '';
    this._phone = '';
    this._address = '';
    this._events.emit("buyer:clear");
  }

  /**
   * Валидация данных покупателя.
   * Возвращает объект с ошибками по каждому полю.
   * Если поле валидно — оно отсутствует в объекте.
   * Если невалидно — содержит строку с описанием ошибки.
   */
  validate(): BuyerErrors {
    const errors: BuyerErrors = {};

    if (!this._payment) {
      errors.payment = 'Не выбран вид оплаты';
    }
    if (!this._email) {
      errors.email = 'Укажите email';
    }
    if (!this._phone) {
      errors.phone = 'Укажите телефон';
    }
    if (!this._address) {
      errors.address = 'Необходимо указать адрес';
    }

    return errors;
  }
}