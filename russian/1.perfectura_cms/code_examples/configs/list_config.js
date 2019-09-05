/*
    Пример конфига по которому генерируются списки
*/

const state = {
    columnsConfig: {
        categories: [
            {
                name: '',
                type: 'flag',
                width: 80,
                fixed: true,
                codename: 'checkbox',
            },
            {
                name: '#',
                type: 'int',
                is_sortable: true,
                width: 100,
                fixed: true,
                codename: 'id',
                sort: {
                    direction: 'DESC',
                    order_by: 'id'
                }
            },
            {
                name: 'Название',
                type: 'text',
                is_sortable: true,
                width: 230,
                codename: 'name',
                isMain: true,
            },
            {
                name: 'Родительская категория',
                type: 'text',
                is_sortable: true,
                width: 230,
                codename: 'parent_name',
            },
            {
                name: 'Конечная категория',
                type: 'bool',
                align_text: 'center',
                width: 180,
                codename: 'is_leaf_node',
            },
            {
                name: 'Карточка товара',
                type: 'text',
                is_sortable: true,
                width: 200,
                codename: 'product_card_name',
            },
            {
                name: 'Кол-во товаров',
                type: 'text',
                is_sortable: true,
                fixed: true,
                width: 180,
                codename: 'goods_count',
            },
            {
                name: 'Ссылка',
                type: 'link',
                is_sortable: false,
                width: 230,
                codename: 'site_url',
            },
            {
                name: 'Комментарий',
                type: 'comment',
                is_sortable: false,
                align_text: 'center',
                width: 140,
                codename: 'comment',
            },
            {
                name: 'Дата создания',
                type: 'date',
                is_sortable: true,
                width: 180,
                codename: 'create_date',
            },
            {
                name: 'Дата изменения',
                type: 'date',
                is_sortable: true,
                width: 180,
                codename: 'edit_date',
            },
        ],
    },
    actionsConfig: {
        categories: {
            addButton: true,
            activationButtons: true,
            deleteButton: true,
        },
    },
    orderPopup: {
        categories: {
            name: 'Популярные категории',
            width: 10,
            draggable: true,
            objectsConsistOf: 'id',
            weightFlag: 'weight',
            pickedFlag: 'is_popular',
            rowConfig: [
                {
                    type: 'text',
                    src: 'name',
                    width: '200px',
                },
                {
                    type: 'text',
                    src: 'goods_count',
                    modClass: 'colorInnactive_5',
                    hoverClass: 'blue-innactive-5',
                    multiEnds: {
                        '0': 'Нет товаров',
                        '1': 'товар',
                        '2_4': 'товара',
                        '5_20': 'товаров'
                    },
                    alignment: 'right',
                    width: '341px',
                },
            ],
        }
    },
    filterConfig: {
        categories: [
            {
                filterTitle: 'Карточки товаров',
                queryName: 'product_card_id__in',
                viewValue: 'name',
                input_type: 'CheckboxList',
                api_route: 'product-cards',
                callbackValue: 'id',
                sortFlag: {
                    value: 'name',
                    direction: 'asc'
                },
            },
            {
                filterTitle: 'Кол-во товаров',
                minMaxCodename: 'goods_count',
                queryName: {
                    min: 'goods_count__gte',
                    max: 'goods_count__lte'
                },
                input_type: 'toFromInteger',
            },
            {
                filterTitle: 'Дата создания',
                queryName: {
                    min: 'create_date__gte',
                    max: 'create_date__lte'
                },
                input_type: 'toFromDate',
                type: 'date_time'
            },
            {
                filterTitle: 'Дата изменения',
                queryName: {
                    min: 'edit_date__gte',
                    max: 'edit_date__lte'
                },
                input_type: 'toFromDate',
                type: 'date_time'
            },
            {
                filterTitle: 'Состояния',
                queryName: 'is_active',
                input_type: 'radiobuttonsList',
                callbackValue: 'value',
                values: [
                    {
                        id: 2,
                        name: 'Все записи',
                        value: '',
                        checked: true
                    },
                    {
                        id: 1,
                        name: 'Активные записи',
                        value: 'true',
                        checked: false
                    },
                    {
                        id: 0,
                        name: 'Неактивные записи',
                        value: 'false',
                        checked: false
                    },
                ]
            },
        ],
    },
    additionalListInterfaces: {
        categories: {
            hasTree: true,
        }
    },
};

export default {
    state
}