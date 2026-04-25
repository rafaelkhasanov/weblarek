import { IProduct } from "../../types";

export class Bucket {
  private _items: Map<string, IProduct> = new Map();

  /** Получение массива товаров, которые находятся в корзине */
  getItems(): IProduct[] {
    return Array.from(this._items.values());
  }

  /** Добавление товара, полученного в параметре, в массив корзины */
  add(item: IProduct): void {
    this._items.set(item.id, item);
  }

  /** Удаление товара, полученного в параметре, из массива корзины */
  remove(item: IProduct): void {
    this._items.delete(item.id);
  }

  /** Очистка корзины */
  clear(): void {
    this._items.clear();
  }

  /** Получение стоимости всех товаров в корзине */
  getTotalPrice(): number {
    let sum = 0;
    for (const item of this._items.values()) {
      sum += item.price == null ? 0 : item.price;
    }
    return sum;
  }

  /** Получение количества товаров в корзине */
  getCount(): number {
    return this._items.size;
  }

  /** Проверка наличия товара в корзине по его id */
  hasProduct(id: string): boolean {
    return this._items.has(id);
  }
}

