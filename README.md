# Тестовое задание

## 1 задание

### Сервис остатков товаров в магазине/ServiceLeftover

Сервис по работе с товарами

#### Схема базы данных

![Схема базы данных сервиса остатков товаров](https://github.com/JustChelUser/testovoe/blob/main/2schema_cut.png)

##### Таблицы : 

1. Good - таблица товаров
2. Good_shelf - таблица остатков товаров /товаров на полках
3. Shelf - таблица полок
4. Shop - таблица магазинов
5. Order - таблица заказов
6. Good order - таблица остатков в заказах / товаров в заказах

#### API эндопинты

* Создание товара (`POST /goods`)
* Получение товара (`GET /goods`)
    * фильтры `name`, `plu`
* Создание остатка (`POST /leftover/create-leftover`)
* Увеличение остатка (`PUT /leftover/increase-leftover`)
* Уменьшение остатка (`PUT /leftover/decrease-leftover`)
* Получение остатков (`GET /leftover`)
    * фильтры `plu`, `shop_id`, `min`, `max`
* Получение остатков в заказах (`GET /leftover/order`)
    * фильтры `plu`, `shop_id`, `min`, `max`

### Сервис истории действий с товарами/ServiceActionHistory

Сервис по отслеживаю истории действий с товарами

#### Схема базы данных

![Схема базы данных сервиса истории действий с товарами](https://github.com/JustChelUser/testovoe/blob/main/1schema_cut.png)

##### Таблицы : 

1. Actions - таблица действий с товарами
2. ActionHistory - таблица истории действий

#### API эндопинты

* Создание записи о действии с товаром (`POST /action`)
* Получение истории действий с товарами (`GET /action`)
    * фильтры `plu`, `shop_id`, `action`, `min_date`, `max_date`, `page`, `limit`

## 2 задание

### Сервис пользователей/UserService

Сервис по работе с пользователями

### API эндопинты

* Получение количества пользователей с проблемами и их решение (`GET /users`)
* Swagger - API документация (`GET /api/docs`)

### Запуск 

   1. Клонируйте репозиторий:
      ```
      git clone https://github.com/JustChelUser/testovoe.git
      ```
   2. Сборка и запуск :
       ```
      docker compose up -d
      ```
   3. В случае внесения изменений может потребоваться пересобрать docker контейнеры без кэша:
        
      3.1 Остановите и удалите контейнеры используя        
      ```
      docker compose down
      ```
      3.2 Пересоберите контейнеры с нуля без кэша используя 
      ```
      docker compose build --no-cache
      ```
      3.3 Запустите контейнеры используя 
      ```
      docker compose up -d
      ```
