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

    if (actions?.onCloseClick) {
      this.modalCloseButton.addEventListener("click", actions.onCloseClick);
      this.container.addEventListener("click", actions.onCloseClick);
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

  /**
   * Открывает модальное окно.
   * Добавляет CSS-класс "modal_active" к контейнеру модального окна,
   * делая его видимым на странице.
   */
  open = () => {
    this.container.classList.add("modal_active");
  };

  /**
   * Закрывает модальное окно.
   * Удаляет CSS-класс "modal_active" из контейнера модального окна,
   * скрывая его со страницы.
   */
  close = () => {
    this.container.classList.remove("modal_active");
  };
}

/**
 * Интерфейс данных модального окна.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Modal.
 */
interface IModal {
  /** Содержимое модального окна */
  content: HTMLElement;
}

/**
 * Интерфейс обработчиков событий модального окна.
 * Содержит callback-функции для обработки событий модального окна.
 */
export interface IModalActions {
  /** Обработчик клика для закрытия модального окна */
  onCloseClick(): void;
}
