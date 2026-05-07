import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

/**
 * Класс Basket отвечает за отображение корзины покупателя.
 * Наследуется от базового класса Component<IBasket>.
 * Управляет списком товаров в корзине, отображением общей стоимости
 * и кнопкой оформления заказа.
 */
export class Basket extends Component<IBasket> {
  /** Список товаров в корзине (элемент <ul>) */
  protected basketList: HTMLUListElement;
  /** Кнопка оформления заказа */
  protected orderButton: HTMLButtonElement;
  /** Элемент отображения общей стоимости заказа */
  protected priceElement: HTMLElement;

  /**
   * Создаёт экземпляр корзины.
   * @param basket - корневой DOM-элемент контейнера корзины
   * @param actions - объект с обработчиками событий корзины
   */
  constructor(basket: HTMLElement, actions?: IBasketActions) {
    super(basket);
    this.basketList = ensureElement<HTMLUListElement>(
      ".basket__list",
      this.container
    );
    this.orderButton = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container
    );
    this.priceElement = ensureElement<HTMLElement>(
      ".basket__price",
      this.container
    );

    if (actions?.onOrderClick) {
      this.orderButton.addEventListener("click", actions.onOrderClick);
    }
  }

  /**
   * Устанавливает список товаров в корзине.
   * Если список пуст, кнопка оформления заказа блокируется.
   * @param value - массив DOM-элементов карточек товаров
   */
  set basketItems(value: HTMLElement[]) {
    this.orderButton.disabled = value.length < 1;
    this.basketList.replaceChildren(...value);
  }

  /**
   * Устанавливает отображение общей стоимости заказа.
   * Если значение не определено, отображается 0.
   * @param value - общая стоимость товаров в синапсах
   */
  set price(value: number) {
    this.priceElement.textContent = `${value ?? 0} синапсов`;
  }
}

/**
 * Интерфейс данных корзины.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Basket.
 */
export interface IBasket {
  /** Массив DOM-элементов товаров в корзине */
  basketItems: HTMLElement[];
  /** Общая стоимость товаров в корзине */
  price: number;
}

/**
 * Интерфейс обработчиков событий корзины.
 * Содержит callback-функции для обработки пользовательских действий.
 */
export interface IBasketActions {
  /** Обработчик нажатия на кнопку оформления заказа */
  onOrderClick(): void;
}
