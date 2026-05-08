import { ensureElement } from "../../utils/utils";
import { Buyer } from "../models/Buyer";
import { Form, FormData } from "./Form";

/**
 * Класс формы контактов для оформления заказа.
 * Наследуется от Form<ContactsFormData> и предоставляет функциональность
 * для отображения и валидации контактных данных покупателя.
 */
export class ContactsForm extends Form<ContactsFormData> {
  protected inputEmailElement: HTMLInputElement;
  protected inputPhoneElement: HTMLInputElement;

  /**
   * Создаёт экземпляр формы контактов.
   * @param contactsForm - корневой DOM-элемент контейнера формы
   * @param actions - обработчики событий формы
   */
  constructor(contactsForm: HTMLFormElement, actions?: IContactsFormActions) {
    super(contactsForm);

    this.inputEmailElement = ensureElement<HTMLInputElement>(
      'input[name="email"]',
      this.container
    );
    this.inputPhoneElement = ensureElement<HTMLInputElement>(
      'input[name="phone"]',
      this.container
    );

    if (actions?.onPayClick) {
      this.button.addEventListener("click", actions.onPayClick);
    }

    if (actions?.onInputEmailChange) {
      this.inputEmailElement.addEventListener(
        "input",
        actions.onInputEmailChange
      );
    }

    if (actions?.onInputPhoneChange) {
      this.inputPhoneElement.addEventListener(
        "input",
        actions.onInputPhoneChange
      );
    }
  }

  /**
   * Устанавливает значение поля телефона.
   * @param value - значение телефонного номера
   */
  set phone(value: string) {
    this.inputPhoneElement.value = value;
  }

  /**
   * Устанавливает значение поля email.
   * @param value - значение электронной почты
   */
  set email(value: string) {
    this.inputEmailElement.value = value;
  }
}

/**
 * Тип данных формы контактов.
 * Содержит поля email и phone из Buyer, а также ошибки валидации.
 */
type ContactsFormData = Pick<Buyer, "phone" | "email"> & FormData;

/**
 * Интерфейс обработчиков событий формы контактов.
 * Расширяет функциональность обработки событий ввода и оплаты.
 */
interface IContactsFormActions {
  /** Обработчик клика по кнопке оплаты */
  onPayClick(event: Event): void;
  /** Обработчик изменения поля email */
  onInputEmailChange(event: Event): void;
  /** Обработчик изменения поля phone */
  onInputPhoneChange(event: Event): void;
}

