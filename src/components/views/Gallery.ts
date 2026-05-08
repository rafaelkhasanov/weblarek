import { Component } from "../base/Component";

/**
 * Класс компонента галереи товаров.
 * Наследуется от Component<IGalery> и отвечает за отображение списка
 * товаров в каталоге, заменяя содержимое контейнера массивом элементов.
 */
export class Gallery extends Component<IGalery> {
  /**
   * Создаёт экземпляр галереи товаров.
   * @param catalogElement - корневой DOM-элемент контейнера галереи
   */
  constructor(catalogElement: HTMLElement) {
    super(catalogElement);
  }

  /**
   * Устанавливает отображение каталога товаров.
   * Заменяет все дочерние элементы контейнера переданным массивом элементов.
   * @param items - массив DOM-элементов товаров для отображения
   */
  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items);
  }
}

/**
 * Интерфейс данных галереи товаров.
 * Определяет структуру данных, которые могут быть переданы
 * в метод render для отображения в компоненте Gallery.
 */
interface IGalery {
  /** Массив DOM-элементов товаров каталога для отображения */
  catalog: HTMLElement[];
}
