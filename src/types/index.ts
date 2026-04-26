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

export type CreateOrder = {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[]
}

export type CreateOrderSuccess = {
    id: string;
    total: number;
}

