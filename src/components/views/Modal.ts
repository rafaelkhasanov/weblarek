import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Modal extends Component<IModal> {
  private modalCloseButton: HTMLButtonElement;
  private modalContent: HTMLElement;

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

  set content(element: HTMLElement) {
    this.modalContent.replaceChildren(element);
  }
}

export interface IModal {
  content: HTMLElement;
}

export interface IModalActions {
  onClose(): void;
}
