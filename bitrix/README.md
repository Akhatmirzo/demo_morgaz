# Газификация — вёрстка под 1С-Битрикс

Страница «Проектирование». Каждая секция — отдельный блок со своей разметкой, стилями и скриптом, по структуре как шаблон компонента.

## Состав

```
common/eg-base.css      общие стили: переменные, сетка, кнопки, поля форм, заголовки секций, логотип, карточки сравнения
common/eg-base.js       маска телефона
blocks/<блок>/
  template.html         разметка
  style.css             стили блока (у estimate нет — использует только общие)
  script.js             есть у header, faq, calculator, modal
img/                    изображения
preview.html            страница целиком
preview-bootstrap.html  то же + Bootstrap 4.6 и стили body сайта
```

Порядок блоков на странице: header, hero, services, analysis, advantages, estimate, steps, audit, calculator, equipment, refusals, faq, cta, footer, modal.

## Подключение

- common/ подключается один раз, в шаблоне сайта.
- Блок переносится в шаблон компонента: template.html → template.php, style.css и script.js кладутся рядом, Битрикс подключит их сам.
- Тексты, цены и картинки в блоках — контент, выносятся в параметры компонента или инфоблок. Hero и другие блоки пойдут на остальные страницы раздела с другим контентом.
- Каждый блок обёрнут в `div.eg-scope` — обёртку не убирать.
- modal — один раз на странице. Открывается любой кнопкой с атрибутом `data-eg-open-modal`.
- Пути к картинкам `img/...` заменить на путь в шаблоне.
- header и footer нужны, только если меняются шапка и подвал сайта. Остальные блоки от них не зависят.

Меню в header: Услуги → Проектирование (6 подразделов), Монтаж, Обслуживание. Текущий раздел — класс `eg-is-active`. На устройствах без hover первый тап по пункту с подменю открывает его, второй — переход по ссылке. В мобильном меню подпункты раскрываются кнопкой со стрелкой.

Каждый блок проверен отдельно: только с common и своими файлами выглядит так же, как на странице. Классы и id с префиксом `eg-`, глобальные теги (body, h1, a, button и т.д.) не переопределяются. С Bootstrap 4.6 и стилями body текущего сайта отличий нет — см. preview-bootstrap.html.

## Шрифт

Stolzl, если его нет — Inter. Используются начертания 400–800. Если на сайте Stolzl подключён только в 300, в common/eg-base.css заменить `--eg-font` на Inter и подключить его:

```
https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap
```

## Формы

Обработчик не подключён: `method="post"`, action пустой. Форма определяется по `data-eg-form`.

```
hero       blocks/hero/template.html      name, phone, agree_personal_data, agree_policy
estimate   blocks/estimate/template.html  name, phone, agree_personal_data, agree_policy
cta        blocks/cta/template.html       name, phone, email, agree_personal_data, agree_policy
callback   blocks/modal/template.html     name, phone
```

Маска телефона — класс `eg-phone-mask`.

Калькулятор считает ориентировочно, на клиенте, формула в blocks/calculator/script.js. Кнопка «Получить точный расчёт» открывает форму обратного звонка.

## Заглушки

Телефон +7 (495) 123-45-67, info@mosgazproekt.ru, адрес в подвале, ссылки `href="#"` (меню, «Подробнее», статьи, политика конфиденциальности).
