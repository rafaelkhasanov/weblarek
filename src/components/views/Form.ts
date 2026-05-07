import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Базовый класс для форм.
 * Наследуется от Component<T> и предоставляет функциональность для отображения
 * формы с полями ввода, кнопкой отправки и отображением ошибок валидации.
 */
export class Form<T> extends Component<T> {
  /** Элемент отображения сообщений об ошибках формы */
  protected formErrorsElement: HTMLElement;
  /** Массив элементов ввода формы */
  protected inputElements: HTMLInputElement[];
  /** Кнопка отправки формы */
  protected button: HTMLButtonElement;

  /**
   * Создаёт экземпляр формы.
   * @param form - корневой DOM-элемент контейнера формы
   * @param actions - обработчик изменения данных в полях ввода
   */
  constructor(form: HTMLElement, actions?: IFormActions) {
    super(form);
    this.formErrorsElement = ensureElement(".form__errors", this.container);
    this.inputElements = ensureAllElements(".form__input", this.container);
    this.button = ensureElement<HTMLButtonElement>(
      'button[type="submit"]',
      this.container
    );

    if (actions?.onInputChange) {
      this.inputElements.forEach((input) =>
        input.addEventListener("change", actions.onInputChange)
      );
    }
  }

  /**
   * Устанавливает отображение ошибок валидации.
   * Если есть ошибки, кнопка отправки блокируется. Ошибки отображаются
   * через запятую в элементе формErrorsElement.
   * @param value - массив строк ошибок (некоторые элементы могут быть undefined)
   */
  set errors(value: (string | undefined)[]) {
    const errorsWithValue = value.filter((x) => x != undefined);
    this.button.disabled = errorsWithValue.length > 0;
    this.formErrorsElement.textContent = errorsWithValue.join(", ");
  }
}

/**
 * Интерфейс данных формы.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Form.
 */
export interface IForm {
  /** Массив строк ошибок валидации (некоторые элементы могут быть undefined) */
  errors: (string | undefined)[];
}

/**
 * Интерфейс обработчиков событий формы.
 * Содержит callback-функции для обработки пользовательских действий.
 */
export interface IFormActions {
  /** Обработчик изменения данных в полях ввода */
  onInputChange(event: Event): void;
}

