import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Тип данных формы.
 * Содержит массив ошибок валидации.
 */
export type FormData = {
  errors: (string | undefined)[];
};

/**
 * Базовый класс для форм.
 * Наследуется от Component<T> и предоставляет функциональность
 * для отображения формы с полями ввода, кнопкой отправки и отображением ошибок валидации.
 */
export abstract class Form<T> extends Component<T> {
  /** Элемент отображения сообщений об ошибках формы */
  protected formErrorsElement: HTMLElement;
  /** Кнопка отправки формы */
  protected button: HTMLButtonElement;

  /**
   * Создаёт экземпляр формы.
   * @param form - корневой DOM-элемент контейнера формы
   */
  constructor(form: HTMLElement) {
    super(form);
    this.formErrorsElement = ensureElement(".form__errors", this.container);
    this.button = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );
  }

  /**
   * Устанавливает отображение ошибок валидации.
   * Если есть ошибки, кнопка отправки блокируется. Ошибки отображаются
   * через запятую в элементе formErrorsElement.
   * @param value - массив строк ошибок (некоторые элементы могут быть undefined)
   */
  set errors(value: (string | undefined)[]) {
    const errorsWithValue = value.filter((x) => x != undefined);
    this.button.disabled = errorsWithValue.length > 0;
    this.formErrorsElement.textContent = errorsWithValue.join(", ");
  }
}

