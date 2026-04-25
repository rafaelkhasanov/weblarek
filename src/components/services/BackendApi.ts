import { CreateOrder, CreateOrderSuccess, IApi, ProductList } from "../../types";

export class BackendApi {

    private _api: IApi;

    constructor(api: IApi) {
        this._api = api;
    }

    /** Метод отправки GET запроса на сервер для получения данных о списке продуктов */
    async getProducts(): Promise<ProductList> {
        try {
            return await this._api.get<ProductList>("/product");
        }
        catch (error) {
            throw `Ошибка получения списка продуктов - ${error}` 
        }
    }

    /** Метод для отправки POST запроса на сервер для создания заказа */
    async createOrder(createOrder: CreateOrder): Promise<CreateOrderSuccess> {
        try {
            return await this._api.post<CreateOrderSuccess>("/order", createOrder);
        }
        catch (error) {
            throw `Ошибка создания заказа - ${error}`
        }
    }
}