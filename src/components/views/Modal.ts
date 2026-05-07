import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Класс модального окна.
 * Наследуется от Component<IModal> и предоставляет функциональность
 * для отображения модального окна с кнопкой закрытия и контейнером контента.
 */
export class Modal extends Component<IModal> {
  /** Кнопка закрытия модального окна */
  private modalCloseButton: HTMLButtonElement;
  /** Контейнер для содержимого модального окна */
  private modalContent: HTMLElement;

  /**
   * Создаёт экземпляр модального окна.
   * @param modal - корневой DOM-элемент контейнера модального окна
   * @param actions - обработчик клика для закрытия модального окна
   */
  constructor(modal: HTMLElement, actions?: IModalActions) {
    super(modal);
    this.modalCloseButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container
    );
    this.modalContent = ensureElement<HTMLElement>(
      ".modal__content",
      this.container
    );

    if (actions?.onClose) {
      this.modalCloseButton.addEventListener("click", actions.onClose);
      this.container.addEventListener("click", actions.onClose);
    }

    this.modalContent.addEventListener("click", (event: Event) =>
      event.stopPropagation()
    );
  }

  /**
   * Устанавливает содержимое модального окна.
   * Заменяет все дочерние элементы контейнера модального окна переданным элементом.
   * @param element - DOM-элемент для отображения в модальном окне
   */
  set content(element: HTMLElement) {
    this.modalContent.replaceChildren(element);
  }
}

/**
 * Интерфейс обработчиков событий модального окна.
 * Содержит callback-функции для обработки событий модального окна.
 */
export interface IModalActions {
  /** Обработчик клика для закрытия модального окна */
  onClose(): void;
}

/**
 * Интерфейс данных модального окна.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Modal.
 */
export interface IModal {
  /** Содержимое модального окна */
  content: HTMLElement;
}

