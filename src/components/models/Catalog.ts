import { IProduct } from "../../types";

export class Catalog {
    private products: Map<string, IProduct>;
    private openedProductId: string | undefined;

    constructor() {
        this.products = new Map<string, IProduct>();
        this.openedProductId = undefined;
    }

    /** Заполнения каталога, принимает на вход массив IProduct */
    setItems(items: IProduct[]): void {
        this.products.clear();
        items.forEach((product) => {
            this.products.set(product.id, product);
        })
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
    getSelectedProduct(): IProduct | undefined {
        if (this.openedProductId) {
            return this.products.get(this.openedProductId)
        }

        return undefined;
    }

    /** Установить выбранный продукт */
    setSelectedProduct(id: string): void {
        this.openedProductId = id;
    }
}