export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface IBuyer {
    payment: TPayment | null;
    email: string;
    phone: string;
    address: string;
}

export type TPayment = "card" | "cash";

export type ProductList = {
    total: number;
    items: IProduct[]
}

export interface IOrder extends IBuyer {
    total: number;
    items: string[]
}

export type OrderSuccess = {
    id: string;
    total: number;
}

/**
 * Тип данных карточки товара.
 * Описывает минимальный набор полей для отображения карточки.
 */
export type CardData = Pick<IProduct, "title" | "price">

/**
 * Интерфейс обработчиков событий карточки.
 * Содержит callback-функции для обработки пользовательских действий.
 */
export interface ICardActions {
  /** Обработчик клика по карточке */
  onClick(event: Event): void;
}
