import { Form, IForm, IFormActions } from "./Form";

export class ContactsFrom extends Form<IForm> {
  constructor(contactsForm: HTMLFormElement, actions?: IContactsFormActions) {
    super(contactsForm, actions);

    if (actions?.onPayClick) {
      this.button.addEventListener("click", actions.onPayClick);
    }
  }
}

export interface IContactsFormActions extends IFormActions {
  onPayClick(): void;
}
