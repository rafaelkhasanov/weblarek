import { ensureAllElements } from "../../utils/utils";
import { Form, IForm, IFormActions } from "./Form";

const activePaymentClass = "button_alt-active";

export class OrderForm extends Form<IOrderForm> {
  protected altButtons: HTMLButtonElement[];

  constructor(orderForm: HTMLFormElement, actions?: IOrderFormActions) {
    super(orderForm, actions);

    this.altButtons = ensureAllElements<HTMLButtonElement>(
      ".button_alt",
      this.container
    );

    if (actions?.onNextClick) {
      this.button.addEventListener("click", actions.onNextClick);
    }

    if (actions?.onPaymentClick) {
      this.altButtons.forEach((button) =>
        button.addEventListener("click", actions.onPaymentClick)
      );
    }
  }

  set activePayment(value: string | null) {
    this.altButtons.forEach((button) => {
      if (button.name === value) {
        button.classList.add(activePaymentClass);
      } else {
        button.classList.remove(activePaymentClass);
      }
    });
  }
}

export interface IOrderForm extends IForm {
  activePayment: string | null;
}

export interface IOrderFormActions extends IFormActions {
  onNextClick(): void;
  onPaymentClick(event: Event): void;
}
