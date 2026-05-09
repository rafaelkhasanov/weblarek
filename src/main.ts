import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { Basket } from "./components/models/Basket";
import { Buyer } from "./components/models/Buyer";
import { Catalog } from "./components/models/Catalog";
import { BackendApi } from "./components/services/BackendApi";
import { Basket as BasketView } from "./components/views/Basket";
import { CardBasket } from "./components/views/CardBasket";
import { CardCatalog } from "./components/views/CardCatalog";
import {
  CardPreview,
  ProductBuyStateKey,
} from "./components/views/CardPreview";
import { ContactsForm } from "./components/views/ContactsForm";
import { Gallery } from "./components/views/Gallery";
import { Header } from "./components/views/Header";
import { Modal } from "./components/views/Modal";
import { OrderForm } from "./components/views/OrderForm";
import { OrderSuccess as OrderSuccessView } from "./components/views/OrderSuccess";
import "./scss/styles.scss";
import { IProduct, OrderSuccess } from "./types";
import { API_URL, CDN_URL } from "./utils/constants";
import { cloneTemplate, ensureElement } from "./utils/utils";

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderFormTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsFormTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const orderSuccessTemplate = ensureElement<HTMLTemplateElement>("#success");

const galeryElement = ensureElement<HTMLElement>(".gallery");
const modalElement = ensureElement<HTMLElement>(".modal");
const header = ensureElement<HTMLElement>(".header");

const events = new EventEmitter();

const catalog = new Catalog(events);
const buyer = new Buyer(events);
const basket = new Basket(events);

const headerView = new Header(header, {
  onBasketClick: () => events.emit("header-view:basket-click"),
});

const galeryView = new Gallery(galeryElement);
const cardPreview = new CardPreview(cloneTemplate(cardPreviewTemplate), {
  onClick: () => events.emit("card-preview:click"),
});
const modalView = new Modal(modalElement, {
  onCloseClick: () => events.emit("modal-view:close-click"),
});
const basketView = new BasketView(cloneTemplate(basketTemplate), {
  onOrderClick: () => events.emit("basket-view:order-click"),
});

const orderFormView = new OrderForm(cloneTemplate(orderFormTemplate), {
  onPaymentClick: (event) => {
    events.emit("order-form:payment-click", event);
  },
  onAddressChange: (event) => {
    events.emit("order-form:address-change", event);
  },
  onNextClick: () => {
    events.emit("order-form:next-click");
  },
});

const contactsFormView = new ContactsForm(cloneTemplate(contactsFormTemplate), {
  onPayClick: (event: Event) => {
    event.preventDefault();
    events.emit("contacts-form:pay-click");
  },
  onInputEmailChange: (event) => {
    events.emit("contacts-form:email-change", event);
  },
  onInputPhoneChange: (event) => {
    events.emit("contacts-form:phone-change", event);
  },
});

const orderSuccessView = new OrderSuccessView(
  cloneTemplate(orderSuccessTemplate),
  {
    onOrderSuccessClick: () => events.emit("order-success-view:click"),
  }
);

const backendApi = new BackendApi(new Api(API_URL));
backendApi
  .getProducts()
  .then((result) => {
    result.items.forEach((item) => (item.image = `${CDN_URL}${item.image}`));
    catalog.setItems(result.items);
  })
  .catch((reason) => console.error(`Ошибка запроса -, ${reason}`));

const onCatalogChange = () => {
  const itemCards = catalog.getItems().map((item) => {
    const card = new CardCatalog(cloneTemplate(cardCatalogTemplate), {
      onClick: (event: Event) => {
        event.stopPropagation();
        events.emit("card-catalog:select", item);
      },
    });
    return card.render(item);
  });

  galeryView.render({ catalog: itemCards });
};

const onSelectedProduct = (selectedProduct: IProduct) => {
  catalog.setSelectedProduct(selectedProduct.id);
};

const onChangeSelectedProduct = () => {
  const selectedProduct = catalog.getSelectedProduct();
  if (!selectedProduct) {
    return;
  }

  let buyState: ProductBuyStateKey = "buy";
  if (basket.hasProduct(selectedProduct.id)) {
    buyState = "delete";
  }

  if (selectedProduct.price == null || selectedProduct.price === 0) {
    buyState = "notAvailable";
  }

  const cardPreviewData = { ...selectedProduct, buyState: buyState };
  const renderedPreview = cardPreview.render(cardPreviewData);
  modalView.open();
  modalView.render({ content: renderedPreview });
};

const onCardBasketViewDelete = (item: IProduct) => {
  basket.remove(item);
};

const onBasketChange = () => {
  const renderedBasketView = basketView.render({
    basketItems: renderCardBasketItems(),
    price: basket.getTotalPrice(),
  });
  modalView.render({ content: renderedBasketView });
  headerView.render({ counter: basket.getCount() });
};

const onBasketViewOrderClick = () => {
  const { payment, address } = buyer.validate();
  const renderedOrderForm = orderFormView.render({
    address: buyer.address,
    payment: buyer.payment,
    errors: [payment, address],
  });
  modalView.render({ content: renderedOrderForm });
};

const onCardPreviewClick = () => {
  const seletectedProduct = catalog.getSelectedProduct();
  if (!seletectedProduct) {
    return;
  }

  if (basket.hasProduct(seletectedProduct.id)) {
    basket.remove(seletectedProduct);
  } else {
    basket.add(seletectedProduct);
  }

  modalView.close();
};

const onOrderFormPaymentClick = (event: Event) => {
  const htmlTarget = event.target as HTMLButtonElement;
  buyer.payment =
    htmlTarget.hasAttribute("name") &&
    htmlTarget.getAttribute("name") === "card"
      ? "card"
      : "cash";
};

const onOrderFormAddressChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  buyer.address = input.value;
};

const onAddressOrPaymentChange = (): void => {
  const { payment, address } = buyer.validate();
  const renderedOrderForm = orderFormView.render({
    errors: [payment, address],
    payment: buyer.payment,
    address: buyer.address,
  });

  modalView.render({ content: renderedOrderForm });
};

const onEmailOrPhoneChange = () => {
  const { email, phone } = buyer.validate();
  const renderedOrderForm = contactsFormView.render({
    errors: [email, phone],
    email: buyer.email,
    phone: buyer.phone,
  });

  modalView.render({ content: renderedOrderForm });
};

const onOrderFormNextClick = () => {
  const { email, phone } = buyer.validate();
  const contactsForm = contactsFormView.render({
    email: buyer.email,
    phone: buyer.phone,
    errors: [email, phone],
  });
  modalView.render({ content: contactsForm });
};

const onContactsFormPayClick = () => {
  const basketItemIds = basket.getItems().map((x) => x.id);
  backendApi
    .createOrder({
      address: buyer.address,
      email: buyer.email,
      payment: buyer.payment,
      phone: buyer.phone,
      total: basket.getTotalPrice(),
      items: basketItemIds,
    })
    .then((value: OrderSuccess) => {
      const renderedOrderSuccess = orderSuccessView.render({
        totalPrice: value.total,
      });
      modalView.render({ content: renderedOrderSuccess });

      basket.clear();
      buyer.clear();
    })
    .catch((reason) => {
      console.error(`Ошибка запроса -, ${reason}`);
    });
};

const onContactsFormInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  const inputName = input.getAttribute("name");
  switch (inputName) {
    case "email":
      buyer.email = input.value;
      break;
    case "phone":
      buyer.phone = input.value;
      break;
  }
};

const onHeaderViewBasketClick = () => {
  const renderedBasketView = basketView.render({
    basketItems: renderCardBasketItems(),
    price: basket.getTotalPrice(),
  });
  modalView.open();
  modalView.render({ content: renderedBasketView });
};

const onOrderSuccessClick = () => {
  modalView.close();
};

const onModalCloseClick = () => {
  modalView.close();
};

const renderCardBasketItems = (): HTMLElement[] => {
  const items = basket.getItems().map((item, index) => {
    const cardBasket = new CardBasket(cloneTemplate(cardBasketTemplate), {
      onClick: () => events.emit("card-basket-view:delete", item),
    });

    return cardBasket.render({
      index: ++index,
      price: item.price ?? 0,
      title: item.title,
    });
  });

  return items;
};

events.on("catalog:change", onCatalogChange);
events.on("card-basket-view:delete", onCardBasketViewDelete);
events.on("card-preview:click", onCardPreviewClick);
events.on("card-catalog:select", onSelectedProduct);
events.on("catalog:change-selected-product", onChangeSelectedProduct);
events.on("basket:change", onBasketChange);
events.on("basket-view:order-click", onBasketViewOrderClick);
events.on("header-view:basket-click", onHeaderViewBasketClick);
events.on("order-form:payment-click", onOrderFormPaymentClick);
events.on("buyer:address-change", onAddressOrPaymentChange);
events.on("buyer:payment-change", onAddressOrPaymentChange);
events.on("buyer:email-change", onEmailOrPhoneChange);
events.on("buyer:phone-change", onEmailOrPhoneChange);
events.on("order-form:address-change", onOrderFormAddressChange);
events.on("order-form:next-click", onOrderFormNextClick);
events.on("contacts-form:pay-click", onContactsFormPayClick);
events.on("contacts-form:email-change", onContactsFormInputChange);
events.on("contacts-form:phone-change", onContactsFormInputChange);
events.on("order-success-view:click", onOrderSuccessClick);
events.on("modal-view:close-click", onModalCloseClick);
