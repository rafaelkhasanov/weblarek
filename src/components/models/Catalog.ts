import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Catalog {
  private products: Map<string, IProduct>;
  private openedProduct: IProduct | null;
  private events: IEvents;

  constructor(events: IEvents) {
    this.products = new Map<string, IProduct>();
    this.openedProduct = null;
    this.events = events;
  }

  /** Заполнения каталога, принимает на вход массив IProduct */
  setItems(items: IProduct[]): void {
    this.products.clear();
    items.forEach((product) => {
      this.products.set(product.id, product);
    });

    this.events.emit("catalog:change");
  }

  /** Получения массива товаров каталога */
  getItems(): IProduct[] {
    return [...this.products.values()];
  }

  /** Получение продукта из каталога по идентификатору */
  getProductById(id: string): IProduct | undefined {
    return this.products.get(id);
  }

  /** Получение выбранного продукта */
  getSelectedProduct(): IProduct | null {
    return this.openedProduct;
  }

  /** Установить выбранный продукт */
  setSelectedProduct(id: string): void {
    this.openedProduct = this.products.get(id) ?? null;
    this.events.emit("catalog:change-selected-product");
  }
}

export interface ICatalogActions {
  onSetItems(): void;
}
