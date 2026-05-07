import { Form, IForm, IFormActions } from "./Form";

/**
 * Класс формы контактов для оформления заказа.
 * Наследуется от Form<IForm> и предоставляет функциональность
 * для отображения и валидации контактных данных покупателя.
 */
export class ContactsForm extends Form<IForm> {
  /**
   * Создаёт экземпляр формы контактов.
   * @param contactsForm - корневой DOM-элемент контейнера формы
   * @param actions - обработчик клика по кнопке оплаты
   */
  constructor(contactsForm: HTMLFormElement, actions?: IContactsFormActions) {
    super(contactsForm, actions);

    if (actions?.onPayClick) {
      this.button.addEventListener("click", actions.onPayClick);
    }
  }
}

/**
 * Интерфейс обработчиков событий формы контактов.
 * Расширяет интерфейс IFormActions и добавляет обработчик клика по кнопке оплаты.
 */
export interface IContactsFormActions extends IFormActions {
  /** Обработчик клика по кнопке оплаты */
  onPayClick(): void;
}

