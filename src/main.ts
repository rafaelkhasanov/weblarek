import { Api } from './components/base/Api';
import { Bucket } from './components/models/Bucket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { BackendApi } from './components/services/BackendApi';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

var catalog = new Catalog();
catalog.setItems(apiProducts.items);
console.log('Массив товаров из каталога - ', catalog.getItems())

var firstProduct = apiProducts.items.at(0);
console.log(`Получение продукта с идентификатором - ${firstProduct?.id}`, catalog.getProductById(firstProduct!.id));

catalog.setSelectedProduct(firstProduct!.id);
console.log(`Вывод выбранного продукта c идентификатором ${firstProduct!.id}`, catalog.getSelectedProduct());

var buyer = new Buyer();
buyer.address = "Улица тестовая";
console.log('Вывод улица', buyer.address);

buyer.email = "test@test.ru"
console.log('Установка и вывод электронной почты', buyer.email);

buyer.payment = 'upon receipt';
console.log('Установка и вывод способа оплаты', buyer.payment);

buyer.phone = "89111111111";
console.log('Установка и вывод номера телефона', buyer.phone);

buyer.address = '';
console.log('Проверка работы валидации', buyer.validate());

buyer.clear();
console.log('Проверка метода очистки', buyer);

var bucket = new Bucket();
bucket.add(firstProduct!);
console.log('Положили товар в корзину', firstProduct);
console.log('Вывод количества', bucket.getCount());
console.log('Вывод товаров, которые лежат в корзине', bucket.getItems());

var secondProduct = apiProducts.items.at(1);
console.log('Кладем еще товар в корзину', )
bucket.add(secondProduct!);
console.log('Вывод общей стоимости товаров, которые лежат в корзине', bucket.getTotalPrice());
console.log(`Проверка наличия товара с идентификатором ${secondProduct?.id}`, bucket.hasProduct(secondProduct!.id))

bucket.remove(secondProduct!);
console.log('Удалили товар', secondProduct!);
console.log('Проверяем есть ли товар в корзине', bucket.hasProduct(secondProduct!.id));

console.log('Чистим корзину');
bucket.clear();
console.log('Проверяем что в корзине пусто', bucket.getItems());

var backendApi = new BackendApi(new Api(API_URL));
var result = await backendApi.getProducts();
console.log(`Результат ответа с сервера`, result)

catalog.setItems(result.items);
console.log('Такие данные с сервера получили и положили в каталог', catalog.getItems());