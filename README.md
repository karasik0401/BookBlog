# BookBlog

### Описание
Благодаря этому проекту можно публиковать изменять удалять посты и загружать к ним фотографии, оставлять комментарии под постами и подписываться на понравившихся авторов.
### Технологии
Python, Django, DRF, Simple JWT.
### Как запустить проект:

Клонировать репозиторий и перейти в него в командной строке:

```
git clone https://github.com/mmjax/api_final_yatube.git
```

```
cd api_final_yatube
```

Cоздать и активировать виртуальное окружение:

```
python -m venv venv
```

```
source venv/Scripts/activate
```

```
python -m pip install --upgrade pip
```

Установить зависимости из файла requirements.txt:

```
pip install -r requirements.txt
```

Выполнить миграции:

```
python manage.py migrate
```

Запустить проект:

```
python manage.py runserver
```

## **Примеры запросов**
```
GET /api/v1/posts/
```
**Образец ответа**
```
{
    "id": 0,
    "author": "string",
    "text": "string",
    "pub_date": "2019-08-24T14:15:22Z",
    "image": "string",
    "group": 0
}
```
---
```
POST /api/v1/posts/
```
**Образец ответа**
```
}
    "text": "string",
    "image": "string",
    "group": 0
}
```
**Образец ответа**
```
{
    "id": 0,
    "author": "string",
    "text": "string",
    "pub_date": "2019-08-24T14:15:22Z",
    "image": "string",
    "group": 0
}
```
---
```
PUT /api/v1/posts/{id}/
```
**Образец ответа**
```
{
    "text": "stringstring",
    "image": "string",
    "group": 0
}
```
**Образец ответа**
```
{
    "id": 0,
    "author": "stringstring",
    "text": "string",
    "pub_date": "2019-08-24T14:15:22Z",
    "image": "string",
    "group": 0
}
```
---
```
PATCH /api/v1/posts/{id}/
```
**Образец ответа**
```
{
    "text": "anotherstring"
}
```
**Образец ответа**
```
{
    "id": 0,
    "author": "stringstring",
    "text": "anotherstring",
    "pub_date": "2019-08-24T14:15:22Z",
    "image": "string",
    "group": 0
}
```
---
```
DELETE /api/v1/posts/{id}/
```
---
```
GET /api/v1/posts/{post_id}/comments/
```
**Образец ответа**
```
[
    {
        "id": 0,
        "author": "string",
        "text": "string",
        "created": "2019-08-24T14:15:22Z",
        "post": 0
    }
]
```
---
```
POST /api/v1/posts/{post_id}/comments/
```
**Образец ответа**
```
{
    "text": "string"
}
```
**Образец ответа**
```
{
    "id": 0,
    "author": "string",
    "text": "string",
    "created": "2019-08-24T14:15:22Z",
    "post": 0
}
```
---
```
POST /api/v1/jwt/create/
```
**Образец ответа**
```
{
    "username": "string",
    "password": "string"
}
```
**Образец ответа**
```
{
    "refresh": "string",
    "access": "string"
}
```
