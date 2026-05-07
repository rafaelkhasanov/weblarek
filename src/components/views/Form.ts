import { ensureAllElements, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class Form<T> extends Component<T> {
  protected formErrorsElement: HTMLElement;
  protected inputElements: HTMLInputElement[];
  protected button: HTMLButtonElement;

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

  set errors(value: (string | undefined)[]) {
    const errorsWithValue = value.filter((x) => x != undefined);
    this.button.disabled = errorsWithValue.length > 0;
    this.formErrorsElement.textContent = errorsWithValue.join(", ");
  }
}

export interface IForm {
  errors: (string | undefined)[];
}

export interface IFormActions {
  onInputChange(event: Event): void;
}
