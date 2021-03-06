# SEARCHLIGHT

**ЗАДАЧА:** Сделать систему для ведения студийной документации с возможностью
дальнейшей доработки до уровня продукта.  

**ТЕХНОЛОГИИ:**

* **Фронт:** vue.js + vuex

* **бэк:** Django + drf


**СУДЬБА ПРОЕКТА:** На начало 2019 сервис работал как хранилище документации по проектам студии.

# Описание

[Скринкаст на youtube](https://www.youtube.com/watch?v=iq5BHQian9I)

**Дашборд проектов ([Этот компонент в качестве примера](/russian/old/2.searchlight/code_example.vue))**

Основная сущность сервиса это _проект_. У проекта есть _страницы_.

![](static/01.jpg)

---

**Страница проекта**

Документ представляет собой обыкновенный текст написанный с помощью markdown.
В _проекте_ имеется множество _страниц_ со своей иерархией.

![](static/02.jpg)

---

**Страница Проекта с открытым сайдбаром**

![](static/03.jpg)

---

**Страница с результатами поиска**

Также имеется система поиска которая позволяет искать по названию проекта, 
названию страницы, а также контенту страницы

![](static/04.jpg)

---

При этом вся система полностью адаптивна для всех актуальных мобильных устройств

**Дашборд для средних экранов**

![](static/05.jpg)

**Дашборд для мобилок**

![](static/06.jpg)

**Страница проекта для мобилок**

![](static/07.jpg)
