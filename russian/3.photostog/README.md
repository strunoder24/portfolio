# PHOTOSTOG

**ЗАДАЧА:** Сделать систему для хранения снимков фото-студии, 
доступ к которым будет максимально удобен.

**ТЕХНОЛОГИИ:**

* **Фронт:** vue.js + vuex

* **бэк:** Django + drf


**СУДЬБА ПРОЕКТА:** Проект успешно внедрен и применяется заказчиком по назначению.

# Описание

По условиям контракта дизайном должна была заниматся сторонняя студия, поэтому 
представленный ниже дизайн является прототипом. При этом система полностью функциональна.

**Главная страница**

На этой странице можно увидеть все доступные пользователю изображения. 
Можно выбрать необходимые фильтры и настроить сортировку. 

![](./static/01.png)

---

**Главная страница с активными фильтрами**

На данном скрине можно увидеть выпадающее меню фильтрации по тегам.

![](./static/02.png)

---

**Страница изображения**

Большинство элементов интерактивно и при нажатии на них пользователь перенаправляются на главную
с применением выбранного фильтра.

![](./static/03.png)

---

**Страница редактирования/загрузки изображения ([Этот компонент в качестве примера](/russian/3.photostog/code_example.vue))**


![](./static/04.png)

---

**Страница печати изображения**

Любое изображение можно распечатать со всей необходимой информацией (Выбирается в попапе 
перед отправкой на печать).

![](./static/05.png)