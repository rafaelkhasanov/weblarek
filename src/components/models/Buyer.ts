
  /** Получение всех данных покупателя */
import { IBuyer, TPayment } from "../../types";

export type BuyerErrors = {
    payment?: string;
    email?: string;
    phone?: string;
    address?: string;
};

export class Buyer implements IBuyer {
  private _payment: TPayment = '';
  private _email = '';
  private _phone = '';
  private _address = '';

  get payment(): TPayment {
    return this._payment;
  }
  set payment(value: TPayment) {
    this._payment = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string) {
    this._email = value;
  }

  get phone(): string {
    return this._phone;
  }
  set phone(value: string) {
    this._phone = value;
  }

  get address(): string {
    return this._address;
  }
  set address(value: string) {
    this._address = value;
  }

  /** Очистка данных покупателя */
  clear(): void {
    this._payment = '';
    this._email = '';
    this._phone = '';
    this._address = '';
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